import express from "express";
import { InfluencerList ,addFavInfluencers,removeFavInfluencers,favoriteInfluencers} from "../controller/businessController.js";

const routes = express.Router();

routes.get("/influencerlist", InfluencerList);
routes.get("/favoriteInfluencers/:businessId",favoriteInfluencers)

routes.post('/addFav',addFavInfluencers)
routes.post('/removeFav',removeFavInfluencers)


export default routes;
