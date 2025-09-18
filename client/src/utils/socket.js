// utils/socket.js
import { io } from "socket.io-client";

let socketInstance = null;
const Url = import.meta.env.VITE_API_BASE_URL;

export const initSocket = (userId) => {
  if (!socketInstance) {
    socketInstance = io(Url, {
      query: { userId },
    });
  }
  return socketInstance;
};

export const getSocket = () => {
  return socketInstance;
};
