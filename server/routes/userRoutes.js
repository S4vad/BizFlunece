import express from "express";
import { uploadImage } from "../config/cloudinary.js";

import { userSignup ,googleAuth,userLogin,profileUpdate, updateImage,getCampaign, getProfile,addBookmark,removeBookmark,isBookmarked} from "../controller/userController.js";


const routes =express.Router();

routes.get('/profile/:userId',getProfile)
routes.get('/influencer/campaignlist',getCampaign)
routes.get('/influencer/is-bookmarked', isBookmarked);


routes.post('/signup',userSignup)
routes.post('/login',userLogin)
routes.post('/googleAuth',googleAuth)
routes.post('/profile/upload/:userId',uploadImage.single("image"),updateImage)
routes.post('/influencer/add-bookmark',addBookmark)
routes.post('/influencer/remove-bookmark',removeBookmark)


routes.put('/profile/:userId',profileUpdate)




export default routes;