import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useChatStore from "@/stores/chatStore";
import ProfilePicture from "./ProfilePicture";
import Loader from "../../components/ui/Loader";
import { getUserFromStorage } from "@/utils/LocalStorage";

const ConversationList = () => {
  const currentUser = getUserFromStorage();
  console.log("current user",currentUser)
  const {
    conversations,
    activeConversation,
    loading,
    error,
    loadConversations,
    setActiveConversation,
  } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      loadConversations(currentUser.id);
    }
    // run only once after mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // Remove duplicate partnerUser._id entries
  const uniqueConversations = conversations.filter(
    (c, index, self) =>
      index === self.findIndex(
        (t) => t.partnerUser._id === c.partnerUser._id
      )
  );

  return (
    <div className="h-full overflow-y-auto">
      {uniqueConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      ) : (
        uniqueConversations.map((conversation) => (
          <div
            key={conversation.partnerUser._id}
            className={`flex cursor-pointer items-center border-b p-3 hover:bg-gray-50 ${
              activeConversation?.user?._id === conversation.partnerUser._id
                ? "bg-blue-50"
                : ""
            }`}
            onClick={() => {
              setActiveConversation(conversation);
              navigate(
                `/conversation/messages/${conversation.partnerUser._id}`,
              );
            }}
          >
            <ProfilePicture
              src={conversation.partnerUser.profileImage}
              alt={conversation.partnerUser.name}
              size="md"
            />
            <div className="ml-3 min-w-0 flex-1">
              <div className="flex justify-between">
                <h4 className="truncate font-medium">
                  {conversation.partnerUser.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {conversation.lastMessage?.timestamp
                    ? new Date(
                        conversation.lastMessage.timestamp,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="truncate text-sm text-gray-500">
                  {conversation.lastMessage ? (
                    conversation.lastMessage.senderId === conversation.partnerUser._id
                      ? conversation.lastMessage.content
                      : `You: ${conversation.lastMessage.content}`
                  ) : "Start a conversation"}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationList;
