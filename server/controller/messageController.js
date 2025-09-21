import Conversation from "../models/conversation.model.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../config/socketServer.js";
import userModel from "../models/Users.js";
import BusinessProfile from "../models/BusinessProfile.js";
import InfluencerProfile from "../models/InfluencerProfile.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const sender = req.currentUser.id;
    const { receiver } = req.params;
    const { message } = req.body;

    let fileUrl;
    if (req.file) {
      // multer-storage-cloudinary stores URL in req.file.path
      fileUrl = req.file.path;
      console.log("Uploaded file URL:", fileUrl);
    }

    // Find conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    // Create new message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image: fileUrl || null,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // Realtime via Socket.IO
    const receiverSocketId = getReceiverSocketId(receiver);
    const senderSocketId = getReceiverSocketId(sender);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

// get messages
export const getMessage = async (req, res) => {
  try {
    const sender = req.currentUser.id;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({ message: "conversation not found" });
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export async function getChatUsers(req, res) {
  try {
    const { isBusiness } = req.query;
    let users;
    if (isBusiness === "true") {
      users = await InfluencerProfile.find();
    } else {
      users = await BusinessProfile.find();
    }
    if (!users.length) {
      return res.status(400).json({ message: "users not found for chat" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("error fetching chat users");
    res.status(500).json({ message: error.message });
  }
}
