import express from "express";
import { InfluencerList ,addFavInfluencers,removeFavInfluencers,favoriteInfluencers,createCampaign} from "../controller/businessController.js";
import { uploadVideo } from "../config/cloudinary.js";
const routes = express.Router();

routes.get("/influencerlist", InfluencerList);
routes.get("/favoriteInfluencers/:businessId",favoriteInfluencers)

routes.post('/addFav',addFavInfluencers)
routes.post('/removeFav',removeFavInfluencers)
routes.post('/createcampaign',uploadVideo.single("videoAd"),createCampaign)


export default routes;
