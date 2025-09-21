import { io } from "socket.io-client";

let socketInstance = null;
const Url = import.meta.env.VITE_API_BASE_URL;

export const initSocket = (userId) => {
  if (!socketInstance) {
    socketInstance = io(Url, {
      query: { userId },
    });

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected successfully:", socketInstance.id);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });
  }
  
  return socketInstance;
};

export const getSocket = () => {
  return socketInstance;
};