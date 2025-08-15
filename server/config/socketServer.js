import http from "http";
import express from "express";
import { Server } from "socket.io";
import Message from "../models/messageModel.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  },
  path: "/socket.io",
  pingTimeout: 60000,
  pingInterval: 25000
});

// Store user socket connections
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle authentication and user joining
  socket.on("authenticate", (userId) => {
    if (!userId) {
      socket.disconnect();
      return;
    }
    
    // Remove previous connection if exists
    if (userSocketMap[userId]) {
      io.to(userSocketMap[userId]).emit("forceDisconnect", "Multiple connections detected");
      io.sockets.sockets.get(userSocketMap[userId])?.disconnect();
    }
    
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });

  // Handle sending messages
  socket.on("sendMessage", async (messageData) => {
    try {
      const { senderId, receiverId, content } = messageData;

      // Create message in database
      const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        message: content,
        read: false
      });

      // Populate sender and receiver details
      const populatedMessage = await Message.findById(newMessage._id)
        .populate("sender", "name image")
        .populate("receiver", "name image");

      // Emit to both sender and receiver
      const receiverSocketId = getReceiverSocketId(receiverId);
      const senderSocketId = getReceiverSocketId(senderId);
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", populatedMessage);
      }
      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", populatedMessage);
      }
    } catch (error) {
      console.error("Error handling sendMessage:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userId = Object.keys(userSocketMap).find(
      key => userSocketMap[key] === socket.id
    );
    if (userId) {
      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
      console.log(`User ${userId} disconnected`);
    }
  });

  // Error handling
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

export { app, server, io };