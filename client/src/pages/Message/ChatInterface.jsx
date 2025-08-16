// ChatInterface.jsx
import { useRef, useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { SenderMessage } from "../../components/SenderMessage";
import { ReceiverMessage } from "../../components/ReceiverMesssage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/chatSlice";
import axios from "axios";
import { getSocket } from "../../utils/socket";

const ChatInterface = ({ partnerUser, currentUser }) => {
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
      const res=await axios.post("/send/" + partnerUser.userId, formData);   

      dispatch(addMessage(res.data));
      socket.emit("sendMessage", res.data);

      setInput("");
      setFrontImage(null);
      setBackImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b font-bold">
        {partnerUser.firstName} {partnerUser.lastName}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {showPicker && (
          <EmojiPicker
            onEmojiClick={(e) => setInput((prev) => prev + e.emoji)}
          />
        )}

        {messages.map((msg, i) =>
          msg.sender === currentUserId ? (
            <SenderMessage key={i} image={msg.image} message={msg.message} />
          ) : (
            <ReceiverMessage key={i} image={msg.image} message={msg.message} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {frontImage && (
        <img
          src={frontImage}
          alt=""
          className="size-40 rounded-lg mx-auto mb-2"
        />
      )}

      <form
        onSubmit={handleSend}
        className="p-3 flex items-center gap-2 border-t"
      >
        <button type="button" onClick={() => setShowPicker(!showPicker)}>
          😀
        </button>
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
        />
        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="button" onClick={() => fileInputRef.current.click()}>
          📷
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
