import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
// import adminRoute from './routes/adminRoute'
import cookieParser from "cookie-parser";
import businessRoutes from "./routes/businessRoutes.js";
import { createServer } from "http";
import {app,server} from "./config/socketServer.js";
import conversationRoutes from "./routes/converSationRoutes.js"
import publicRoutes from "./routes/publicRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";


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
app.use("/", publicRoutes);

// Protected 
app.use(authMiddleware); 
app.use("/", userRoutes);
app.use("/business", businessRoutes);
app.use("/conversation", conversationRoutes);


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io endpoint: http://localhost:${PORT}/socket.io/`);
});
