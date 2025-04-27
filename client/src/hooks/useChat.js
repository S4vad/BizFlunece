import { useEffect } from 'react';
import useChatStore from '../stores/chatStore';

const useChat = (currentUser) => {
  const {
    socket,
    messages,
    activeConversation,
    partnerUserProfile,
    initializeChat,
    sendMessage,
    setActiveConversation,
    markAsRead,
    cleanup
  } = useChatStore();

  // Initialize chat only when currentUser changes
  useEffect(() => {
    if (currentUser) {
      initializeChat(currentUser);
      return () => {
        cleanup();
      };
    }
  }, [currentUser]); // Only depend on user.id

  // Mark messages as read
  useEffect(() => {
    if (activeConversation?.partnerUser?._id) {
      const unreadMessages = messages.filter(
        msg => !msg.read && msg.senderId === activeConversation.partnerUser._id
      );
      unreadMessages.forEach(msg => markAsRead(msg._id));
    }
  }, [messages, activeConversation?.partnerUser?._id, markAsRead]);

  return {
    socket,
    messages,
    activeConversation,
    partnerUserProfile,
    sendMessage,
    setActiveConversation,
    markAsRead
  };
};

export default useChat;