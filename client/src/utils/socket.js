// utils/socket.js
import { io } from "socket.io-client";

let socketInstance = null;

export const initSocket = (userId) => {
  if (!socketInstance) {
    socketInstance = io("http://localhost:5000", {
      query: { userId },
    });
  }
  return socketInstance;
};

export const getSocket = () => {
  return socketInstance;
};
