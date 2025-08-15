import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

export const useChat = (userId) => {
  const { socket, onlineUsers } = useSocket(userId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message) => {
      setNewMessage(message);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  useEffect(() => {
    if (newMessage) {
      setMessages(prev => [...prev, newMessage]);
      setNewMessage(null);
    }
  }, [newMessage]);

  return { messages, onlineUsers };
};