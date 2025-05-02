import mongoose from "mongoose";

const CampaignBookmarkSchema=new mongoose.Schema({
  userId: { type: String, required: true },
  campaignIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "campaignData",
    required: true,
  },]
});

const CampaignBookmark  = mongoose.model("CampaignBookmark ", CampaignBookmarkSchema);

export default CampaignBookmark; 