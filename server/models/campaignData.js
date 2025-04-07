import mongoose from "mongoose";
const campaignSchema=mongoose.Schema( {
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business", 
    required: true,
    index: true, // Indexing for better query performance
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  platforms: {
    type: [String],
    enum: ["Instagram", "TikTok", "YouTube", "Facebook", "Twitter"],
    required: true,
  },
  deliverables: {
    type: String,
    required: true,
  },
  videoDuration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  videoAd: {
    type: String, 
    default: "",
  },
  companyImage:{
    type:String,
  }
},
{ timestamps: true }
);


const campaignData=mongoose.model("campaignData",campaignSchema);
export default campaignData;