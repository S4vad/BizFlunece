import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userSignup ,googleAuth} from "../controller/userController.js";


const routes =express.Router();


routes.post('/signup',userSignup)
routes.post('/googleAuth',googleAuth)



export default routes;