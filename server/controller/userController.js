import userModel from "../models/userShema.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

dotenv.config()

export async function userSignup(req, res) {

  const { name, email, password, socialMediaHandle, isBusiness } = req.body;

   try {

    const existingUser = await userModel.findOne({email})
    if (existingUser){
      return res.status(400).json({error:'email already in use!'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      isBusiness: isBusiness,
      socialMediaHandle: socialMediaHandle,
    });

    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET || "defaultsecret123",{expiresIn:"5d"})
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax'
    });
    

    res.status(201).json({ message: "user Signed succesfully!" });
  } catch (error) {
    res.status(500).json({ error: "server error!" });
  }
}
