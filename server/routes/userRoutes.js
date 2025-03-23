import express from "express";
import { upload } from "../config/cloudinary.js";

import { userSignup ,googleAuth,userLogin,userProfile,profileUpdate,uploadImage} from "../controller/userController.js";


const routes =express.Router();

routes.get('/profile/:userId',userProfile)

routes.post('/signup',userSignup)
routes.post('/login',userLogin)
routes.post('/googleAuth',googleAuth)
routes.post('/profile/upload/:userId',upload.single("image"),uploadImage)

routes.put('/profile/:userId',profileUpdate)




export default routes;