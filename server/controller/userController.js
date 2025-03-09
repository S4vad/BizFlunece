import userModel from "../models/userShema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import googleuser from "../models/googleuser.js";

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
