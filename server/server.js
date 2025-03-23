import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
// import adminRoute from './routes/adminRoute'
import cookieParser from "cookie-parser";
import businessRoutes from "./routes/businessRoutes.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // Important for cookies
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(cookieParser());

app.use('/',userRoutes)
// app.use('/admin',adminRoute)
app.use("/business", businessRoutes); 

app.use(express.static("public"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
