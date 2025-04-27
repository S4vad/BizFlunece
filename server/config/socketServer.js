import { Server } from "socket.io";
import MessageModel from "../models/messageModel.js";
import userModel from "../models/Users.js";
import InfluencerProfile from "../models/InfluencerProfile.js";
import BusinessProfile from "../models/BusinessProfile.js";

export default function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Match your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join user's room
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
      try {
        // Verify both users exist
        const [sender, receiver] = await Promise.all([
          userModel.findById(senderId),
          userModel.findById(receiverId),
        ]);

        if (!sender || !receiver) {
          throw new Error("Invalid sender or receiver");
        }

        // Create and save the message
        const message = new MessageModel({
          sender: sender._id,
          receiver: receiver._id,
          content,
        });

        await message.save();

        // Get sender's profile for the frontend
        const senderProfile = sender.isBusiness
          ? await BusinessProfile.findOne({ userId: sender._id })
          : await InfluencerProfile.findOne({ userId: sender._id });

        // Prepare the message object to emit
        const messageWithSender = {
          ...message.toObject(),
          senderProfile: senderProfile ? senderProfile.toObject() : null,
        };

        // Emit to both parties
        io.to(senderId.toString()).emit("newMessage", messageWithSender);
        io.to(receiverId.toString()).emit("newMessage", messageWithSender);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("messageError", error.message);
      }
    });

    // Handle message read status updates
    socket.on("markAsRead", async ({ messageId, userId }) => {
      try {
        const message = await MessageModel.findByIdAndUpdate(
          messageId,
          { read: true },
          { new: true }
        );

        if (message) {
          io.to(userId.toString()).emit("messageRead", messageId);
        }
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}
