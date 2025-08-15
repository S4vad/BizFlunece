import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useChatStore from "@/stores/chatStore";
import ProfilePicture from "./ProfilePicture";
import Loader from "../../components/ui/Loader";
import { getUserFromStorage } from "@/utils/LocalStorage";

const ChatInterface = () => {
  const { partnerUserId } = useParams();
  const currentUser = getUserFromStorage();
  const {
    messages,
    activeConversation,
    sendMessage,
    loading,
    error,
    hasLoaded,
    socket
  } = useChatStore();
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageInput.trim() && partnerUserId) {
      try {
        await sendMessage({
          content: messageInput,
          partnerUserId,
        });
        setMessageInput("");
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  // Check socket connection status

useEffect(() => {
  if (socket && !socket.connected) {
    console.log("Attempting to reconnect socket...");
    socket.connect();
  }
}, []); // ✅ Run only once, not every render


  if (loading && !hasLoaded) return <Loader />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!activeConversation) return <div className="p-4 text-gray-500">Loading conversation...</div>;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-3 bg-gray-50">
        <ProfilePicture
          src={activeConversation.partnerUser?.image}
          alt={activeConversation.partnerUser?.name}
          size="md"
        />
        <div>
          <h3 className="font-semibold">
            {activeConversation.partnerUser?.name || "Loading..."}
          </h3>
          <p className="text-sm text-gray-500">
            {activeConversation.partnerUser?.isBusiness ? "Business" : "Influencer"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-gray-500">
              <p>No messages yet</p>
              <p>Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender._id === partnerUserId ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  message.sender._id === partnerUserId
                    ? "bg-gray-100"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Message content"
                    className="mb-2 max-h-60 rounded-lg object-cover"
                  />
                )}
                {message.message && <p>{message.message}</p>}
                <div className={`mt-1 text-xs ${message.sender._id === partnerUserId ? "text-gray-500" : "text-blue-100"}`}>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {message.sender._id === currentUser.id && (
                    <span className="ml-2">
                      {message.read ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t p-3 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Type a message..."
            disabled={!partnerUserId}
          />
          <button
            type="submit"
            disabled={!messageInput.trim() || !partnerUserId}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;