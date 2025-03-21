import userModel from "../models/userShema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import googleuser from "../models/googleuser.js";
import InfluencerProfile from "../models/InfluencerProfile.js";

dotenv.config();

export async function userSignup(req, res) {
  const { name, email, password, isBusiness } = req.body;
  const socialMediaHandle = isBusiness ? null : req.body.socialMediaHandle; // Only set for influencers

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already in use!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      isBusiness: isBusiness,
      socialMediaHandle: socialMediaHandle,
    });

    const role = isBusiness ? "business" : "influencer";  


    if (!isBusiness) {
      
      await InfluencerProfile.create({
        userId: newUser._id,
        name: name,
        image: "",
        aboutMe: "",
        bio: "",
        location:"",
        platforms: [], 
      });
    }


    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "defaultsecret123",
      { expiresIn: "5d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User signed up successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isBusiness: newUser.isBusiness,
        socialMediaHandle: newUser.socialMediaHandle,
        role: role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "server error!" });
  }
}

export async function googleAuth(req, res) {
  const client = new OAuth2Client(process.env.VITE_CLIENT_ID);
  try {
    const { token, user } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    let userExist = await googleuser.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email already in use!" });
    }

    const role = user.isBusiness ? "business" : "influencer";

    const newUser = new googleuser({
      name,
      email,
      googleId,
      isBusiness: user.isBusiness,
      role: role,
    });
    await newUser.save();

    const jwtToken = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    

    res.status(201).json({
      message: "User signed up successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isBusiness: newUser.isBusiness,
        role: role,
      },
      token: jwtToken,
    });
  } catch (error) {
    res.status(400).json({ error: "Google login failed!" });
  }
}

export async function userLogin(req, res) {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userModel.findOne({email});



    if (!user) {
      return res.status(400).json({error:"Email is not registered"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({error:"Password is not correct"});
    }

    const role = user.isBusiness ? "business" : "influencer";  


    const token = jwt.sign({ userId: user.id,role }, process.env.JWT_SECRET || "jwt123",  { expiresIn: "5d" });
    res.cookie("token", token, { httpOnly: true ,sameSite:"strict",secure: process.env.NODE_ENV === "production"});

    res.status(201).json({message:"user Logined succesfully !",
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        isBusiness: user.isBusiness,
        role: role,
      },token
  });
  } catch (error) {
    console.error("Login Error:", error); 
    res.status(500).json({error:"server error!"})
  }
}

export async function userProfile(req, res) {
  try {
    const userId = req.params.userId;
    const profile = await InfluencerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });  
    }

    res.status(200).json(profile);  
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" }); 
  }
}


export async function profileUpdate(req, res) {
  try {
    const { userId } = req.params;

    const updatedProfile = await InfluencerProfile.findOneAndUpdate(
      { userId },
      { $push: { portfolio: req.body } }, // Use `$push` for adding to arrays
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


