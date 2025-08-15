import axios from "axios";
import { io } from "socket.io-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getUserFromStorage } from "@/utils/LocalStorage";

const useChatStore = create(
  devtools((set, get) => ({
    // State
    socket: null,
    messages: [],
    conversations: [],
    activeConversation: null,
    partnerUserProfile: null,
    loading: false,
    hasLoaded: false,
    initialized: false,
    error: null,
    isConnected: false,

    // Actions
    initializeChat: async (currentUser) => {
      const { socket, initialized } = get();
      if (socket || initialized || !currentUser?.id) return;

      set({ loading: true, error: null });

      try {
        const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
          path: "/socket.io",
          withCredentials: true,
          autoConnect: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          transports: ["websocket"],
        });

        // Socket event handlers
        newSocket.on("connect", async () => {
          console.log("Socket connected");
          newSocket.emit("authenticate", currentUser.id);
          set({ isConnected: true, loading: true });

          try {
            await get().loadConversations(currentUser.id);
          } catch (err) {
            console.error("Error during initial load:", err);
          } finally {
            set({ loading: false, hasLoaded: true });
          }
        });

        newSocket.on("disconnect", () => {
          console.log("Socket disconnected");
          set({ isConnected: false });
        });

        newSocket.on("connect_error", (err) => {
          console.error("Connection error:", err);
          set({ error: "Connection error", isConnected: false });
        });

        newSocket.on("newMessage", (message) => {
          set((state) => {
            const isActiveConversation =
              state.activeConversation?.partnerUser?._id === message.sender._id ||
              state.activeConversation?.partnerUser?._id === message.receiver._id;

            const existingTempIndex = state.messages.findIndex(
              (m) => m._id === `temp-${message.tempId}`
            );

            let newMessages;
            if (existingTempIndex >= 0) {
              newMessages = [...state.messages];
              newMessages[existingTempIndex] = message;
            } else if (isActiveConversation) {
              newMessages = [...state.messages, message];
            } else {
              newMessages = state.messages;
            }

            const updatedConversations = state.conversations.map((conv) => {
              if (
                conv.partnerUser._id === message.sender._id ||
                conv.partnerUser._id === message.receiver._id
              ) {
                const isFromPartner = conv.partnerUser._id === message.sender._id;
                const isUnread = isFromPartner && !message.read;

                return {
                  ...conv,
                  lastMessage: {
                    _id: message._id,
                    content: message.message || "Image",
                    senderId: message.sender._id,
                    timestamp: message.createdAt || new Date(),
                  },
                  unreadCount: isUnread
                    ? (conv.unreadCount || 0) + 1
                    : isFromPartner
                    ? conv.unreadCount
                    : 0,
                };
              }
              return conv;
            });

            return {
              messages: newMessages,
              conversations: updatedConversations,
            };
          });
        });

        newSocket.on("onlineUsers", (onlineUsers) => {
          set((state) => ({
            conversations: state.conversations.map((conv) => ({
              ...conv,
              partnerUser: {
                ...conv.partnerUser,
                isOnline: onlineUsers.includes(conv.partnerUser._id),
              },
            })),
          }));
        });

        set({
          socket: newSocket,
          initialized: true,
          isConnected: newSocket.connected,
        });
      } catch (error) {
        console.error("Socket connection error:", error);
        set({
          error: error.message,
          loading: false,
          initialized: false,
          isConnected: false,
        });
      }
    },

    loadConversations: async (userId) => {
      if (!userId) return;
      set({ loading: true, error: null });
      try {
        const response = await axios.get("/conversation/chat");
        set({
          conversations: response.data,
        });
      } catch (error) {
        console.error("Error loading conversations:", error);
        set({
          error: error.message,
        });
      } finally {
        set({ loading: false, hasLoaded: true });
      }
    },

startNewConversation: async (currentUserId, partnerUserId) => {
  set({ loading: true, error: null });

  try {
    const existingConv = get().conversations.find(
      (conv) => conv.partnerUser._id === partnerUserId
    );

    if (existingConv) {
      get().setActiveConversation(existingConv);
      return existingConv;
    }

    const response = await axios.post("/conversation/start-conversation", {
      userId: currentUserId,
      partnerId: partnerUserId,
    });

    const newConversation = response.data.conversation;

    // ✅ Update conversations immediately so UI updates
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversation: newConversation,
      partnerUserProfile: newConversation.partnerUser,
      messages: [],
      loading: false
    }));

    // ✅ Join the socket room for the new conversation
    const { socket } = get();
    if (socket) {
      socket.emit("joinConversation", newConversation._id);
    }

    // Load messages in background
    get().loadMessagesForConversation(newConversation.partnerUser._id);

    return newConversation;
  } catch (error) {
    set({
      error: "Failed to start conversation: " + error.message,
      loading: false,
    });
    throw error;
  }
},

    setActiveConversation: async (conversation) => {
      if (!conversation?.partnerUser?._id) {
        set({ error: "Invalid conversation data", loading: false });
        return;
      }

      set({ activeConversation: conversation, messages: [], loading: true });

      try {
        const [messagesRes] = await Promise.all([
          axios.get(`/conversation/messages/${conversation.partnerUser._id}`),
        ]);

        if (messagesRes.data.length > 0) {
          const unreadMessages = messagesRes.data.filter(
            (msg) =>
              !msg.read && msg.sender._id === conversation.partnerUser._id
          );

          if (unreadMessages.length > 0) {
            await axios.patch(
              `/conversation/read/${conversation.partnerUser._id}`
            );
          }
        }

        set({
          messages: messagesRes.data,
        });
      } catch (error) {
        set({
          error: error.message,
        });
      } finally {
        set({ loading: false });
      }
    },

    sendMessage: async (messageData) => {
      const { socket, activeConversation } = get();
      if (!socket || !activeConversation) {
        console.error("Socket or active conversation not available");
        throw new Error("Connection not available");
      }

      try {
        const currentUser = getUserFromStorage();
        const { content, partnerUserId, image } = messageData;
        const tempId = Date.now();

        const tempMessage = {
          _id: `temp-${tempId}`,
          sender: {
            _id: currentUser.id,
            name: currentUser.name,
            image: currentUser.image,
          },
          receiver: {
            _id: partnerUserId,
          },
          message: content,
          image,
          createdAt: new Date(),
          read: false,
          tempId,
        };

        set((state) => ({
          messages: [...state.messages, tempMessage],
        }));

        const messageToSend = {
          senderId: currentUser.id,
          receiverId: partnerUserId,
          content,
          tempId,
        };

        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("receiver", partnerUserId);
          formData.append("message", content || "");

          await axios.post(`/conversation/send/${partnerUserId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } else {
          socket.emit("sendMessage", messageToSend);
        }

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.partnerUser._id === partnerUserId
              ? {
                  ...conv,
                  lastMessage: {
                    _id: tempMessage._id,
                    content,
                    senderId: currentUser.id,
                    timestamp: tempMessage.createdAt,
                  },
                  unreadCount: 0,
                }
              : conv
          ),
        }));

        return tempId;
      } catch (error) {
        console.error("Error sending message:", error);

        set((state) => ({
          messages: state.messages.filter(
            (m) => m._id !== `temp-${messageData.tempId}`
          ),
          error: "Failed to send message",
        }));

        throw error;
      }
    },

    cleanup: () => {
      const { socket } = get();
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("newMessage");
        socket.off("onlineUsers");
        socket.disconnect();
      }
      set({
        socket: null,
        messages: [],
        conversations: [],
        activeConversation: null,
        partnerUserProfile: null,
        isConnected: false,
        initialized: false,
        hasLoaded: false,
      });
    },

    retryConnection: () => {
      const { socket, cleanup } = get();
      if (socket) {
        cleanup();
      }
      const currentUser = getUserFromStorage();
      if (currentUser?.id) {
        get().initializeChat(currentUser);
      }
    },

    getUnreadCount: () => {
      return get().conversations.reduce(
        (total, conv) => total + (conv.unreadCount || 0),
        0
      );
    },
  }))
);

export default useChatStore;