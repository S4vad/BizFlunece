import mongoose from "mongoose";

const CampaignParticipationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaignData",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InfluencerProfile",
      required: true,
    },
    campaignOwner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"CompanyProfile",
      required:true
    },
    requestedStatus: {
      type: String,
      enum: ["requested", "approved", "rejected"],
      default: "requested",
    },
    adminResponse: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      respondedAt: Date,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure one participation record per user per campaign
CampaignParticipationSchema.index({userId:1,campaignId:1},{unique:true})

// Index for quick queries
CampaignParticipationSchema.index({campaignOwner:1})
CampaignParticipationSchema.index({userId:1,requestedStatus:1})
CampaignParticipationSchema.index({campaignId:1,"adminResponse.status":1})

const CampaignParticipation = mongoose.model(
  "CampaignParticipation",
  CampaignParticipationSchema
);
export default CampaignParticipation;
