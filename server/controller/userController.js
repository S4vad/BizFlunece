import userModel from "../models/Users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import InfluencerProfile from "../models/InfluencerProfile.js";
import CompanyProfile from "../models/BusinessProfile.js";
import campaignData from "../models/campaignData.js";
import CampaignBookmark from "../models/FavCampaign.js";
import CampaignParticipation from "../models/campaignParticipations.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function signup(req, res) {
  try {
    const { name, email, password, isBusiness, socialMediaHandle, role } =
      req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      isBusiness: isBusiness,
      role: role || (isBusiness ? "business" : "influencer"),
      socialMediaHandle: !isBusiness ? socialMediaHandle : undefined,
    });

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Add profile creation logic
    if (!isBusiness) {
      await InfluencerProfile.create({
        userId: user._id,
        name: name,
        image: "",
        aboutMe: "",
        bio: "",
        location: "",
        platforms: [],
      });
    } else {
      await CompanyProfile.create({
        userId: user._id,
        name: name,
        image: "",
        aboutCompany: "",
        bio: "",
        location: "",
      });
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      socialMediaHandle: user.socialMediaHandle,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not registerd! " });
    }

    if (role && user.role !== role) {
      return res.status(400).json({
        error: `This account is registered as a ${user.role}. Please use the correct login type.`,
      });
    }

    // FIXED: Handle Google users who don't have passwords
    if (!user.password) {
      return res.status(400).json({
        error:
          "This account uses Google authentication. Please sign in with Google.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Password !" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBusiness: user.isBusiness,
      socialMediaHandle: user.socialMediaHandle,
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function verifyToken(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("back called");

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBusiness: user.isBusiness,
      socialMediaHandle: user.socialMediaHandle,
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    // Check if user signed up with Google (no password to reset)
    if (!user.password) {
      return res.status(400).json({
        error:
          "This account uses Google authentication. Please sign in with Google.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save token to user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Password Reset Request</h2>
          <p>Hi ${user.name},</p>
          <p>You requested a password reset for your account. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #6B7280;">${resetURL}</p>
          <p style="color: #EF4444; font-weight: bold;">This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 14px;">Best regards,<br>Your App Team</p>
        </div>
      `,
    };

    // Send email
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message:
        "Password reset email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res
      .status(500)
      .json({ error: "Failed to send reset email. Please try again." });
  }
}

// Reset Password - Verify token and update password
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ error: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Find user with valid reset token
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }, // Token not expired
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ error: "Failed to reset password. Please try again." });
  }
}

// Verify Reset Token - Check if token is valid (optional endpoint)
export async function verifyResetToken(req, res) {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      email: user.email,
    });
  } catch (error) {
    console.error("Verify reset token error:", error);
    res.status(500).json({ error: "Failed to verify token" });
  }
}

export async function googleAuth(req, res) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const { token, user } = req.body;
    const { isBusiness } = user;

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists in your main user model
    let existingUser = await userModel.findOne({
      $or: [{ email: email }, { googleId: googleId }],
    });

    if (existingUser) {
      // User exists, update googleId if not set
      if (!existingUser.googleId) {
        existingUser.googleId = googleId;
        await existingUser.save();
      }

      // Create JWT token
      const jwtToken = jwt.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const userResponse = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        isBusiness:existingUser.isBusiness,
        socialMediaHandle: existingUser.socialMediaHandle,
      };

      return res.status(200).json({ user: userResponse });
    }

    // Create new user
    const newUser = new userModel({
      name,
      email,
      googleId,
      isBusiness,
      role: isBusiness ? "business" : "influencer",
      // No password needed for Google users
      password: null,
    });

    await newUser.save();

    // Create profile based on user type
    if (!isBusiness) {
      await InfluencerProfile.create({
        userId: newUser._id,
        name: name,
        image: picture || "",
        aboutMe: "",
        bio: "",
        location: "",
        platforms: [],
      });
    } else {
      await CompanyProfile.create({
        userId: newUser._id,
        name: name,
        image: picture || "",
        aboutCompany: "",
        bio: "",
        location: "",
      });
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isBusiness:newUser.isBusiness,
      socialMediaHandle: newUser.socialMediaHandle,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      error: "Google authentication failed",
      details: error.message,
    });
  }
}

export async function getProfile(req, res) {
  try {
    const userId = req.params.userId;
    const profile = await InfluencerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
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
      { $set: req.body }, // Use `$set` to update the entire profile
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

export async function updateImage(req, res) {
  try {
    const { userId } = req.params;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path; //cloudinary image url

    const updatedProfile = await InfluencerProfile.findOneAndUpdate(
      { userId },
      { $set: { image: imageUrl } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "profile not found" });
    }
    console.log("the imgea rl is", imageUrl);
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.log("image upload error", error);
    res.status(500).json({ error: "Internal server error!" });
  }
}

export async function getCampaign(req, res) {
  try {
    const campaigns = await campaignData.find({ status: { $ne: "Disabled" } });
    res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
}

export async function isBookmarked(req, res) {
  const { userId, campaignId } = req.query;

  try {
    const bookmark = await CampaignBookmark.findOne({
      userId,
      campaignIds: campaignId,
    });

    if (bookmark) {
      res.status(200).json({ bookmarked: true });
    } else {
      res.status(200).json({ bookmarked: false });
    }
  } catch (error) {
    console.error("Error checking bookmark status", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addBookmark(req, res) {
  const { userId, campaignId } = req.body;

  try {
    const existingBookmark = await CampaignBookmark.findOne({ userId });

    if (existingBookmark) {
      if (!existingBookmark.campaignIds.includes(campaignId)) {
        existingBookmark.campaignIds.push(campaignId);
        await existingBookmark.save();
      }
    } else {
      await CampaignBookmark.create({
        userId,
        campaignIds: [campaignId],
      });
    }

    res.status(200).json({ success: true, message: "Bookmark added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeBookmark(req, res) {
  const { userId, campaignId } = req.body;

  try {
    const existingBookmark = await CampaignBookmark.findOne({ userId });

    if (existingBookmark) {
      const updatedCampaignIds = existingBookmark.campaignIds.filter(
        (id) => id.toString() !== campaignId
      );

      existingBookmark.campaignIds = updatedCampaignIds;
      await existingBookmark.save();

      res.status(200).json({ success: true, message: "Bookmark removed" });
    } else {
      res.status(404).json({ success: false, message: "Bookmark not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSingleCampaign(req, res) {
  try {
    const { campaignId } = req.query;
    const campaign = await campaignData.findById(campaignId);
    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addCampaignParticipation(req, res) {
  const { campaignId, userId, campaignOwner } = req.body;

  try {
    const influencerProfile = await InfluencerProfile.findOne({
      userId: userId,
    });
    const companyProfile = await CompanyProfile.findOne({
      userId: campaignOwner,
    });
    await CampaignParticipation.create({
      influencer: influencerProfile._id,
      campaignId,
      campaignOwner: companyProfile._id,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error creating campaign participation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSingleCampaignStatus(req, res) {
  const { campaignId, userId } = req.query;

  try {
    const check = await CampaignParticipation.findOne({
      campaignId,
      influencer: userId,
    });
    console.log("check is", check);

    if (check) {
      res.status(200).json({ participated: true, show: false });
    } else {
      res.status(200).json({ participated: false, show: true });
    }
  } catch (error) {
    console.error("Error checking campaign status", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "!token required for authentication" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).json({ message: "!user not found" });
    }

    res.status(200).json({ data: decode });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("error fetching current user");
  }
}

export async function getUserCampaigns(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "user is not found!" });
    }
    const influencer = await InfluencerProfile.findOne({ userId: userId });
    const campaigns = await CampaignParticipation.find({
      influencer: influencer._id,
    })
      .populate("campaignId", "title companyName companyImage")
      .sort({ createdAt: -1 });
    console.log(campaigns);

    res.status(200).json({ data: campaigns });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNotifications(req, res) {
  try {
    const { userId } = req.query;

    const influencerProfile = await InfluencerProfile.findOne({ userId });
    if (!influencerProfile) {
      return res.status(404).json({ message: "Influencer profile not found" });
    }

    const influencerCategories = influencerProfile.influencerCategory;

    const campaigns = await campaignData.find({
      category: { $in: influencerCategories },
      status: "Active",
    });
    return res.status(200).json({ data: campaigns });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
