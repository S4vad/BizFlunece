import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConversationList from "./ConversationList";
import ChatInterface from "./ChatInterface";
import useChatStore from "@/stores/chatStore";
import Loader from "../../components/ui/Loader";
import { getUserFromStorage } from "@/utils/LocalStorage";
import Navbar from "../influencer/Navbar";

const MessagesLayout = () => {
  const { userId:partnerUserId } = useParams();
  const navigate = useNavigate();
  const currentUser = getUserFromStorage();
  const {
    conversations,
    loading,
    setActiveConversation,
    startNewConversation,
    initializeChat,
    initialized,
    hasLoaded, // Add this to your store
  } = useChatStore();

  // Initialize chat only once
  useEffect(() => {
    if (currentUser.id && !initialized) {
      initializeChat(currentUser);
    }
  }, [currentUser?.id, initialized, initializeChat]);

  useEffect(() => {
    if (!hasLoaded || loading) return;

    const handleConversation = async () => {
      if (!partnerUserId) {
        if (conversations.length > 0) {
          navigate(`/conversation/messages/${conversations[0].partnerUser._id}`);
        }
        return;
      }

      const existingConversation = conversations.find(
        (c) => c.partnerUser._id === partnerUserId
      );

      if (existingConversation) {
        await setActiveConversation(existingConversation);
      } else {
        if (conversations.length > 0) {
          navigate("/conversation/messages");
        } else {
          await startNewConversation(currentUser._id, partnerUserId);
        }
      }
    };

    handleConversation();
  }, [
    partnerUserId,
    conversations,
    hasLoaded,
    loading,
    currentUser._id,
    setActiveConversation,
    startNewConversation,
    navigate
  ]);


  if (loading && !hasLoaded) return <Loader />;

  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-80px)] rounded-lg border bg-white">
        <div className="w-full border-r md:w-80">
          <div className="flex items-center justify-between border-b p-3">
            <h3 className="mr-4 text-lg font-semibold text-indigo-600">
              Messages
            </h3>
            <div className="relative w-60 max-w-xs">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search messages"
                className="w-full rounded-lg border border-gray-300 py-1.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-[0.8] focus:ring-blue-500"
              />
            </div>
          </div>
          <ConversationList />
        </div>

        <div className={`flex-1 ${!partnerUserId ? "hidden md:block" : ""}`}>
          {partnerUserId ? (
            <ChatInterface />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="p-6 text-center">
                <h3 className="mb-2 text-xl font-medium">
                  {conversations.length === 0
                    ? "Welcome to Messages"
                    : "Select a conversation"}
                </h3>
                <p className="text-gray-500">
                  {conversations.length === 0
                    ? "Start a new conversation by visiting a profile"
                    : "Choose from your existing conversations"}
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
