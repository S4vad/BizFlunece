import axios from "axios";
import io from "socket.io-client";
import { create } from "zustand";
import { devtools } from 'zustand/middleware';  

const useChatStore = create(devtools((set, get) => ({
  socket: null,
  messages: [],
  conversations: [],
  activeConversation: null,
  partnerUserProfile: null,
  loading: false,
  hasLoaded: false,
  initialized: false,
  error: null,

  // Initialize socket and load conversations
  initializeChat: async (currentUser) => {
    const { socket, initialized } = get();
    if (socket || initialized || !currentUser) return;

    set({ loading: true });

    try {
      //initilalize socket
      const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
        path: "/socket.io",
        withCredentials: true,
        autoConnect: true,
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server");
        if (currentUser) {
          newSocket.emit("join", currentUser.id);
          get().loadConversations(currentUser.id);
        }
      });

      newSocket.on("newMessage", (message) => {
        set((state) => {
          //Add to current messages if active conversation matches
          const newMessages =
            message.sender === state.activeConversation?.partnerUser?._id ||
            message.receiver === state.activeConversation?.partnerUser?._id
              ? [...state.messages, message]
              : state.messages;

          //update conversation list
          const updatedConversations = state.conversations.map((conv) => {
            if (
              conv.partnerUser._id === message.sender ||
              conv.partnerUser._id === message.receiver
            ) {
              return {
                ...conv,
                lastMessage: message,
                unreadCount:
                  conv.partnerUser._id === message.sender
                    ? (conv.unreadCount || 0) + 1
                    : conv.unreadCount,
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

      set({ socket:newSocket, loading: false, initialized: true });
    } catch (error) {
      console.error("Socket connection error:", error);
      set({ error: error.message, loading: false, initialized: false });
    }
  },

  //load all conversations for the user
  loadConversations: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/conversation/chat");
      console.log("laoded conversatins",response.data)
      set({
        conversations: response.data,
        loading: false,
        hasLoaded: true,
      });
    } catch (error) {
      console.error('Error loading conversations:', error);
      set({
        error: error.message,
        loading: false,
        hasLoaded: true,
      });
    }
  },


//here partner user id send from front end directly
  startNewConversation: async (currentUserId, partnerUserId) => {
    set({ loading: true });

    try {
      // First check locally
      const partnerIdStr = partnerUserId.toString();
    
      console.log('Looking for conversation with partner:', partnerUserId);
    console.log('Current conversations:', get().conversations);
      const existingConv = get().conversations.find(
        conv => conv.partnerUser._id === partnerIdStr
      );
      console.log('existing conver',existingConv)
      if (existingConv) {
        console.log('Using existing conversation');
        await get().setActiveConversation(existingConv);
        return existingConv; // Return the conversation
      }
  
      // Check with server
      const response = await axios.post('/conversation/start-conversation', {
        userId: currentUserId,
        partnerId: partnerUserId
      });

      console.log('Server response:', response.data);
  
      const newConversation = {
        partnerUser: response.data.conversation.partnerUser,
        lastMessage: response.data.conversation.lastMessage,
        unreadCount: 0
      };
      console.log('the new conversations ',newConversation)
  
      set(state => ({
        conversations: [...state.conversations, newConversation],
        loading: false
      }));
  
      await get().setActiveConversation(newConversation);
      return newConversation; // Return the new conversation
    } catch (error) {
      set({
        error: "Failed to start conversation: " + error.message,
        loading: false
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
      //fecth message and profile
      const [messagesRes, profileRes] = await Promise.all([
        axios.get(`/conversation/messages/${conversation.partnerUser._id}`),
        axios.get(
          `/conversation/profile/${conversation.partnerUser._id}`,
        ),
      ]);

      //mark messages as read
      if (messagesRes.data.length > 0) {
        await axios.patch(`/conversation/read/${conversation.partnerUser._id}`);
      }

      set({
        messages: messagesRes.data,
        partnerUserProfile: profileRes.data,
        conversations: get().conversations.map((conv) =>
          conv.partnerUser._id === conversation.partnerUser._id
            ? { ...conv, unreadCount: 0 }
            : conv,
        ),
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  //send message
  sendMessage: (content) => {
    const { socket, activeConversation } = get();
    if (!socket || !activeConversation) return;

    const currentUser = JSON.parse(localStorage.getItem("user"));
    socket.emit("sendMessage", {
      senderId: currentUser.id, // Use current user's ID as sender
      receiverId: activeConversation.partnerUser._id,
      content,
    });
  },

  //clean up
  cleanup: () => {
    const { socket } = get();
    if (socket) {
      socket.off("connect");
      socket.off("newMessage");
      socket.disconnect();
    }
    set({
      socket: null,
      messages: [],
      conversations: [],
      activeConversation: null,
      partnerUserProfile: null,
      initialized: false,
    });
  },
})));

export default useChatStore;
