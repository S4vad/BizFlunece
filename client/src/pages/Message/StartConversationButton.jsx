import { useNavigate } from "react-router-dom";
import { getUserFromStorage } from "@/utils/LocalStorage";
import useChatStore from "@/stores/chatStore";
import { useEffect } from "react";

const StartConversationButton = ({ partnerUserId }) => {
  const navigate = useNavigate();
  const currentUser = getUserFromStorage();
  const { startNewConversation, initializeChat, initialized } = useChatStore();

 useEffect(() => {
  if (currentUser?.id && !initialized) {
    initializeChat(currentUser);
  }
}, [currentUser?.id, initialized, initializeChat]);

const handleStartConversation = async () => {
  if (!currentUser?.id || !partnerUserId) return;

  try {
    const conversation = await startNewConversation(currentUser.id, partnerUserId);
    if (conversation) {
      navigate(`/conversation/messages/${partnerUserId}`, { replace: true }); // ✅ prevent history loop
    }
  } catch (error) {
    console.error("Failed to start conversation:", error);
  }
};


  return (
    <button
      onClick={handleStartConversation}
      className="rounded-lg bg-indigo-600 px-4 py-1 text-white transition-colors hover:bg-indigo-500"
    >
      Message
    </button>
  );
};

export default StartConversationButton;