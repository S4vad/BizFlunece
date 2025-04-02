import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userLogin",
      required: true,
      unique: true,
    },
    name: {
      type: String,

      trim: true,
    },
    followers: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    aboutUs: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,

      trim: true,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessProfile", profileSchema);

