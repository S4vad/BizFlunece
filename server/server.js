import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// import adminRoute from './routes/adminRoute'
import cookieParser from "cookie-parser";
import businessRoutes from "./routes/businessRoutes.js";
import { app, server } from "./config/socketServer.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import {
  getChatUsers,
  getMessage,
  sendMessage,
} from "./controller/messageController.js";
import { uploadImage } from "./config/cloudinary.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Important for cookies
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Public
app.use("/", authRoutes);

// Protected
app.use(authMiddleware);
app.use("/", userRoutes);
app.use("/business", businessRoutes);

// message controllers

app.post(
  "/send/:receiver",
  authMiddleware,
  uploadImage.single("image"),
  sendMessage
);
app.get("/get-messages/:receiver", authMiddleware, getMessage);
app.get("/get-chat-users", authMiddleware, getChatUsers);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io endpoint: http://localhost:${PORT}/socket.io/`);
});
