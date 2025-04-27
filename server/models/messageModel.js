import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userLogin",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userLogin",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});



messageSchema.index({ sender: 1, receiver: 1 }); // For finding conversations
messageSchema.index({ receiver: 1, read: 1 }); // For finding unread messages
messageSchema.index({ timestamp: -1 }); // For sorting



const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
