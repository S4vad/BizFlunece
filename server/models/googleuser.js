import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isBusiness: { type: Boolean, required: true },
    googleId: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("googleAuth", userSchema);

export default User;
