import express from "express";
import {
  InfluencerList,
  addFavInfluencers,
  removeFavInfluencers,
  favoriteInfluencers,
  createCampaign,
  getCompanyProfile,
  updateCompanyImage,
  companyProfileUpdate,
  getCampaigns,
  updateCampaignStatus,
  getPendingRequests,
  handleParticipationRequest,
  getCampaignParticipations,
  getRecentCampaigns,
} from "../controller/businessController.js";
import { uploadVideo } from "../config/cloudinary.js";
import { uploadImage } from "../config/cloudinary.js";
import { getProfile } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const routes = express.Router();

routes.get("/influencerlist", InfluencerList);
routes.get("/favoriteInfluencers/:businessId", favoriteInfluencers);
routes.get("/company_profile/:userId", getCompanyProfile);
routes.get("/influencer/:userId", getProfile);
routes.get("/campaigns/:id", getCampaigns);
routes.get("/pending-requests/:businessId", getPendingRequests);
routes.get("/campaign-participations/:campaignId", getCampaignParticipations);
routes.get("/get-recent-activities/:businessId", getRecentCampaigns);

routes.post("/addFav", addFavInfluencers);
routes.post("/removeFav", removeFavInfluencers);
routes.post("/createcampaign", uploadVideo.single("videoAd"), createCampaign);
routes.post(
  "/profile/upload/:userId",
  uploadImage.single("image"),
  updateCompanyImage
);
routes.post("/campaign-status-update", updateCampaignStatus);
routes.post("/handle-request", authMiddleware, handleParticipationRequest);

routes.put("/update-profile/:userId", companyProfileUpdate);

export default routes;
