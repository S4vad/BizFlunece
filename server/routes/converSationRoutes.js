import express from "express";
import {
  sendMessage,
  getMessages,
  markAsRead,
} from "../controller/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {uploadImage} from "../config/cloudinary.js"
import Conversation from "../models/conversation.model.js";
import User from "../models/Users.js";
import mongoose from "mongoose";



const router = express.Router();

// Protected routes
router.use(authMiddleware);

// Message routes
router.post(
  "/send/:receiver",
  uploadImage.single("image"),
  sendMessage
);
router.get("/messages/:receiver", getMessages);
router.patch("/read/:messageId", markAsRead);

// Conversation list route
router.get("/chat", async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
    .populate({
      path: "participants",
      match: { _id: { $ne: userId } },
      select: "name email isBusiness",
      model: "userLogin"
    })
    .populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
      populate: [
        { path: "sender", select: "name", model: "userLogin" },
      ],
    })
    .sort({ updatedAt: -1 });

    const formattedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const partnerUser = conv.participants.find(
          p => p._id.toString() !== userId
        );

        // Get profile data
        let profile;
        if (partnerUser.isBusiness) {
          profile = await CompanyProfile.findOne({ userId: partnerUser._id });
        } else {
          profile = await InfluencerProfile.findOne({ userId: partnerUser._id });
        }

        return {
          partnerUser: {
            ...partnerUser.toObject(),
            image: profile?.image || null,
            bio: profile?.bio || null
          },
          lastMessage: conv.messages[0] ? {
            _id: conv.messages[0]._id,
            content: conv.messages[0].message,
            senderId: conv.messages[0].sender._id,
            timestamp: conv.messages[0].createdAt,
          } : null,
          unreadCount: conv.messages.filter(
            msg => !msg.read && msg.sender._id.toString() !== userId
          ).length,
        };
      })
    );

    res.status(200).json(formattedConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start new conversation
router.post("/start-conversation", async (req, res) => {
  try {
    const { userId, partnerId } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(userId) || 
        !mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ message: "Invalid user IDs" });
    }

    // Check if users exist - using the correct model name 'userLogin'
    const users = await User.find({ 
      _id: { $in: [userId, partnerId] } 
    });
    
    if (users.length !== 2) {
      return res.status(404).json({ message: "One or both users not found" });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, partnerId] }
    }).populate({
      path: 'participants',
      match: { _id: { $ne: userId } },
      select: 'name email isBusiness',
      model: 'userLogin' // Explicitly specify the model name
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, partnerId],
        messages: []
      });
      
      // Re-populate after creation
      conversation = await Conversation.findById(conversation._id)
        .populate({
          path: 'participants',
          match: { _id: { $ne: userId } },
          select: 'name email isBusiness',
          model: 'userLogin'
        });
    }

    const partnerUser = conversation.participants.find(
      p => p._id.toString() !== userId.toString()
    );

    if (!partnerUser) {
      return res.status(404).json({ message: "Partner user not found" });
    }

    res.status(200).json({
      conversation: {
        partnerUser: {
          _id: partnerUser._id,
          name: partnerUser.name,
          email: partnerUser.email,
          isBusiness: partnerUser.isBusiness
        },
        lastMessage: null,
        unreadCount: 0
      }
    });

  } catch (error) {
    console.error("Start conversation error:", error);
    res.status(500).json({ 
      message: "Failed to start conversation",
      error: error.message 
    });
  }
});


router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get appropriate profile based on user type
    let profile;
    if (user.isBusiness) {
      profile = await CompanyProfile.findOne({ userId });
    } else {
      profile = await InfluencerProfile.findOne({ userId });
    }

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      ...profile.toObject(),
      isBusiness: user.isBusiness,
      email: user.email
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});
export default router;