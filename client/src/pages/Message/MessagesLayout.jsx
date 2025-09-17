import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentChat,
  setUsers,
  setOnlineUsers,
  setMessages,
  addMessage,
} from "../../store/chatSlice";
import ChatInterface from "./ChatInterface";
import { useEffect } from "react";
import axios from "axios";
import { getSocket } from "../../utils/socket";
import ProfilePicture from "./ProfilePicture";
import { useAuth } from "@/context/AuthContext";

const MessagesLayout = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chat.users);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const { user: userData } = useAuth();

  // fetch users
  useEffect(() => {
    if (!userData) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `/get-chat-users?isBusiness=${userData.isBusiness}`,
        );
        dispatch(setUsers(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // socket listeners
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("newMessage", (msg) => {
      dispatch(addMessage(msg));
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("newMessage");
    };
  }, [dispatch]);

  // fetch messages for selected user
  const handleUserClick = async (user) => {
    dispatch(setCurrentChat(user.userId));
    try {
      const res = await axios.get("/get-messages/" + user.userId);
      dispatch(setMessages(res.data || []));
    } catch (err) {
      dispatch(setMessages([]));
      console.log(err);
    }
  };

  const chatUser = users.find((u) => u.userId === currentChatId);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-white p-4">
        <div className="sticky top-20 z-20 bg-white p-2">
          <h2 className="mb-4 text-xl font-bold text-purple-500">Messages</h2>
        </div>
        <div className="space-y-2">
          {users?.map((u) => (
            <div
              key={u.userId}
              onClick={() => handleUserClick(u)}
              className={`relative flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 ${
                u.userId === currentChatId ? "bg-gray-100" : ""
              }`}
            >
              <ProfilePicture u={u} onlineUsers={onlineUsers} />
              <span className="truncate font-medium">{u.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-1 flex-col">
        {chatUser ? (
          <ChatInterface
            partnerUser={chatUser}
            currentUser={userData}
            onlineUsers={onlineUsers}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesLayout;
