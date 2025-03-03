import express from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { userSignup } from "../controller/userController.js";


const routes =express.Router();


routes.post('/signup',userSignup)


export default routes;