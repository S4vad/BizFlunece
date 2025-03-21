import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userSignup ,googleAuth,userLogin,userProfile,profileUpdate} from "../controller/userController.js";


const routes =express.Router();

routes.get('/profile/:userId',userProfile)

routes.post('/signup',userSignup)
routes.post('/login',userLogin)
routes.post('/googleAuth',googleAuth)

routes.put('/profile/:userId',profileUpdate)




export default routes;