import express from "express";
import { uploadImage } from "../config/cloudinary.js";

import { userSignup ,googleAuth,userLogin,userProfile,profileUpdate, updateImage,getCampaign} from "../controller/userController.js";


const routes =express.Router();

routes.get('/profile/:userId',userProfile)
routes.get('/influencer/campaignlist',getCampaign)

routes.post('/signup',userSignup)
routes.post('/login',userLogin)
routes.post('/googleAuth',googleAuth)
routes.post('/profile/upload/:userId',uploadImage.single("image"),updateImage)

routes.put('/profile/:userId',profileUpdate)




export default routes;