import Conversation from "../models/conversation.model.js";
import Message from "../models/messageModel.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import { getReceiverSocketId, io } from "../config/socketServer.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "message_images",
        resource_type: "auto",
      });
      image = result.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting local file:", err);
      });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    // Create new message
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
      read: false,
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

    // Populate sender and receiver details for frontend
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name image")
      .populate("receiver", "name image");

    // Emit socket event
    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    // Also send to sender
    const senderSocketId = getReceiverSocketId(sender);
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", populatedMessage);
    }

    return res.status(200).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    })
      .populate({
        path: "messages",
        populate: [
          { path: "sender", select: "name image" },
          { path: "receiver", select: "name image" },
        ],
      })
      .sort({ "messages.createdAt": -1 });

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    await Message.findByIdAndUpdate(messageId, { read: true });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in markAsRead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};