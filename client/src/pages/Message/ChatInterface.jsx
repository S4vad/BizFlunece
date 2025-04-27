import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "@/hooks/useChat";
import ProfilePicture from "./ProfilePicture";
import Loader from "../../components/ui/Loader";
import { getUserFromStorage } from "@/utils/LocalStorage";


const ChatInterface = () => {
  const { partnerUserId } = useParams();
  const currentUser = getUserFromStorage();
  const {
    messages,
    activeConversation,
    partnerUserProfile,
    sendMessage,
    loading,
    error,
  } = useChat(currentUser.Id);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  if (!activeConversation) return null;
  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // Explicitly define message origin checks
  const isPartnerMessage = (message) => {
    if (!message || !partnerUserId) return false;
    return message.senderId === partnerUserId;
  };

  const isCurrentUserMessage = (message) => {
    if (!message || !currentUser?._id) return false;
    return message.senderId === currentUser._id;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-3">
        <ProfilePicture
          src={partnerUserProfile?.image}
          alt={activeConversation.partnerUser.name}
          size="md"
        />
        <div>
          <h3 className="font-semibold">
            {activeConversation.partnerUser.name}
          </h3>
          <p className="text-sm text-gray-500">
            {activeConversation.partnerUser.isBusiness
              ? "Business"
              : "Influencer"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex gap-2 ${
              isPartnerMessage(message) ? "justify-start" : "justify-end"
            }`}
          >
            {isPartnerMessage(message) && (
              <ProfilePicture
                src={partnerUserProfile?.image}
                alt={activeConversation.partnerUser.name}
                size="sm"
              />
            )}

            <div
              className={`max-w-xs rounded-lg p-3 ${
                isPartnerMessage(message) ? "bg-gray-100" : "bg-blue-500 text-white"
              }`}
            >
              <p>{message.content}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {isCurrentUserMessage(message) && (
                  <span className="ml-2 text-xs">
                    {message.read ? "✓✓" : "✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
