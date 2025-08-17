import express from "express";
import { uploadImage } from "../config/cloudinary.js";

import {
  userSignup,
  googleAuth,
  userLogin,
  profileUpdate,
  updateImage,
  getCampaign,
  getProfile,
  addBookmark,
  removeBookmark,
  isBookmarked,
  getSingleCampaign,
  addCampaignParticipation,
  getSingleCampaignStatus,
  getUserCampaigns
} from "../controller/userController.js";

const routes = express.Router();

routes.get("/profile/:userId", getProfile);
routes.get("/influencer/campaignlist", getCampaign);
routes.get("/influencer/is-bookmarked", isBookmarked);
routes.get("/influencer/get-single-campaign", getSingleCampaign);
routes.get('/campaign-participation-status',getSingleCampaignStatus)
routes.get('/influencer/get-user-campaigns/:userId',getUserCampaigns)


routes.post(
  "/profile/upload/:userId",
  uploadImage.single("image"),
  updateImage
);
routes.post("/influencer/add-bookmark", addBookmark);
routes.post("/influencer/remove-bookmark", removeBookmark);
routes.post("/campaign-participation", addCampaignParticipation);

routes.put("/profile/:userId", profileUpdate);

export default routes;
