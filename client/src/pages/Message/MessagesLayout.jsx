import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConversationList from "./ConversationList";
import ChatInterface from "./ChatInterface";
import useChatStore from "@/stores/chatStore";
import Loader from "../../components/ui/Loader";
import { getUserFromStorage } from "@/utils/LocalStorage";
import Navbar from "../influencer/Navbar";

const MessagesLayout = () => {
  const { userId: partnerUserId } = useParams();
  const navigate = useNavigate();
  const currentUser = getUserFromStorage();

  const {
    socket,
    conversations,
    loading,
    setActiveConversation,
    startNewConversation,
    initializeChat,
    initialized,
    hasLoaded,
    cleanup,
    activeConversation // ✅ added to fix "not defined"
  } = useChatStore();

  // Stable callback for conversation selection
  const handleSelectConversation = useCallback(
    async (conversation) => {
      await setActiveConversation(conversation);
      navigate(`/conversation/messages/${conversation.partnerUser._id}`);
    },
    [navigate, setActiveConversation]
  );

  // Initialize chat only once
  useEffect(() => {
    if (currentUser?.id && !initialized) {
      initializeChat(currentUser);
    }
  }, [currentUser?.id, initialized, initializeChat]);

  // Handle initial conversation selection
  useEffect(() => {
    if (!hasLoaded || loading || !currentUser?.id) return;

    const handleInitialConversation = async () => {
      if (partnerUserId) {
        const existingConv = conversations.find(
          (c) => c.partnerUser._id === partnerUserId
        );

        if (existingConv) {
          await setActiveConversation(existingConv);
        } else if (
          !activeConversation ||
          activeConversation.partnerUser._id !== partnerUserId
        ) {
          await startNewConversation(currentUser.id, partnerUserId);
        }
      } else if (conversations.length > 0 && !activeConversation) {
        await handleSelectConversation(conversations[0]);
      }
    };

    handleInitialConversation();
  }, [
    partnerUserId,
    conversations,
    hasLoaded,
    loading,
    currentUser?.id,
    handleSelectConversation,
    setActiveConversation,
    startNewConversation,
    activeConversation
  ]);

  if (loading && !hasLoaded) return <Loader />;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List - Fixed width */}
        <div className="w-80 border-r bg-white flex flex-col">
          <div className="p-3 border-b">
            <h3 className="text-lg font-semibold text-indigo-600">Messages</h3>
          </div>
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>

        {/* Chat Interface - Flexible width */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {partnerUserId ? (
            <ChatInterface key={partnerUserId} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6 max-w-md">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  {conversations.length
                    ? "Select a conversation"
                    : "No conversations yet"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {conversations.length
                    ? "Choose a chat to continue"
                    : "Start by messaging someone"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesLayout;
