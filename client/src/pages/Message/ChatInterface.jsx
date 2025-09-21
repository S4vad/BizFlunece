// ChatInterface.jsx
import { useRef, useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/chatSlice";
import axios from "axios";
import { getSocket } from "../../utils/socket";
import { Smile, Image as ImageIcon, Send } from "lucide-react";


const ChatInterface = ({ partnerUser, currentUser, onlineUsers }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef();
  const currentUserId = currentUser.id;
  const socket = getSocket();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackImage(file);
    setFrontImage(URL.createObjectURL(file));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !backImage) return;

    const formData = new FormData();
    formData.append("receiver", partnerUser.userId);
    if (input) formData.append("message", input);
    if (backImage) formData.append("image", backImage);

    try {
    await axios.post("/send/" + partnerUser.userId, formData);


      setInput("");
      setFrontImage(null);
      setBackImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* Fixed Header */}
     
      <div className="sticky top-16 z-20 flex items-center gap-3 border-b bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={partnerUser.image || "/image.png"}
            alt="avatar"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-gray-900">{partnerUser.name}</h2>
            {onlineUsers?.includes(partnerUser.userId) ? (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                Online
              </span>
            ) : (
              <span className="text-xs text-gray-500">Last seen recently</span>
            )}
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto p-4">
        {/* Emoji Picker */}
        {showPicker && (
          <div className="absolute bottom-20 left-5 z-20">
            <EmojiPicker
              onEmojiClick={(e) => setInput((prev) => prev + e.emoji)}
            />
          </div>
        )}

        {/* Show Profile + Placeholder if no messages */}
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <img
              src={partnerUser.image || "/image.png"}
              alt="profile"
              className="mb-3 h-20 w-20 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">
              {partnerUser.firstName} {partnerUser.lastName}
            </h3>
            <p className="text-sm text-gray-400">
              Start your first conversation 👋
            </p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isSender = msg.sender === currentUserId;
            return (
              <div
                key={i}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-2xl p-3 shadow-sm ${
                    isSender
                      ? "rounded-br-none bg-blue-400 text-white *:text-white"
                      : "rounded-bl-none border bg-white text-gray-800 *:text-gray-800"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="attachment"
                      className="mb-2 h-40 w-40 rounded-lg object-cover"
                    />
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preview image before sending */}
      {frontImage && (
        <div className="flex justify-center p-2">
          <img
            src={frontImage}
            alt="preview"
            className="h-32 w-32 rounded-lg border object-cover"
          />
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-0 z-20 flex items-center gap-2 border-t bg-white p-3"
      >
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="text-gray-500"
        >
          <Smile size={24} className="hover:stroke-yellow-500" />
        </button>

        <input
          type="text"
          className="flex-1 rounded-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={handleImageChange}
          accept="image/*"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-gray-500"
        >
          <ImageIcon size={24} className="hover:stroke-green-500" />
        </button>

        <button
          type="submit"
          className="rounded-full bg-blue-500 p-2 hover:bg-blue-600"
        >
          <Send size={20} className="stroke-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
