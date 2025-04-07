import mongoose from "mongoose";

const InfluencerBookmarkSchema=new mongoose.Schema({
  userId: { type: String, required: true },
  campaignIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaignData",
    required: true,
  },]
});

const InfluencerBookmark  = mongoose.model("InfluencerBookmark ", InfluencerBookmarkSchema);

export default InfluencerBookmark; 