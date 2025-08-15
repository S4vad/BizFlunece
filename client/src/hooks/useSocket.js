import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io('http://localhost:5001', {
      path: "/socket.io",
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket"]
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
      socketInstance.emit("authenticate", userId);
      console.log("Socket connected");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socketInstance.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socketInstance.on("forceDisconnect", (message) => {
      console.log(message);
      socketInstance.disconnect();
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.off("connect");
        socketInstance.off("disconnect");
        socketInstance.off("onlineUsers");
        socketInstance.off("forceDisconnect");
        socketInstance.disconnect();
      }
    };
  }, [userId]);

  return { socket, onlineUsers, isConnected };
};