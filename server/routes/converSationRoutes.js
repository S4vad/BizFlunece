import express from "express";
import MessageModel from "../models/messageModel.js";
import userModel from "../models/Users.js";
import InfluencerProfile from "../models/InfluencerProfile.js";
import BusinessProfile from "../models/BusinessProfile.js";
import { compareSync } from "bcrypt";
const router = express.Router();

// Get all conversations
router.get("/chat", async (req, res) => {
  try {
    const partners = await MessageModel.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.currentUser.userId },
            { receiverId: req.currentUser.userId},
          ],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", req.currentUser.userId] },
              "$receiverId",
              "$senderId",
            ],
          },
        },
      },
    ]);

    const conversations = await Promise.all(
      partners.map(async ({ _id: partnerUserId }) => {
        const [lastMessage, unreadCount, partnerUser] = await Promise.all([
          MessageModel.findOne({
            $or: [
              { senderId: req.currentUser.userId, receiverId: partnerUserId },
              { senderId: partnerUserId, receiverId: req.currentUser.userId },
            ],
          }).sort({ timestamp: -1 }),

          MessageModel.countDocuments({
            senderId: partnerUserId,
            receiverId: req.currentUser.userId,
            read: false,
          }),

          userModel.findById(partnerUserId).select("-password -__v"),
        ]);

        return {
          partnerUser: partnerUser.toObject(),
          lastMessage,
          unreadCount,
        };
      })
    );

    res.json(conversations.filter((c) => c.partnerUser)); // Filter out null users
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations" });
  }
});

/// Get messages between current user and partner user
router.get("/messages/:partnerUserId", async (req, res) => {
  const currentUserId = req.currentUser.userId; 
  const partnerUserId = req.params.partnerUserId;
  try {
    const messages = await MessageModel.find({
      $or: [
        { senderId: currentUserId, receiverId: partnerUserId },
        { senderId: partnerUserId, receiverId: currentUserId },
      ],
    }).sort("timestamp");
    console.log('the message is',messages)

    res.json(messages||[]);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Error fetching messages" });
  }
});


// Mark messages as read
router.patch("/read/:partnerUserId", async (req, res) => {
  try {
    await MessageModel.updateMany(
      {
        senderId: req.params.partnerUserId,
        receiverId: req.currentUser.userId,
        read: false,
      },
      { $set: { read: true } }
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Error marking messages as read" });
  }
});

// Get user profile
router.get("/profile/:partnerId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.partnerId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = user.isBusiness
      ? await BusinessProfile.findOne({ userId: user._id })
      : await InfluencerProfile.findOne({ userId: user._id });

    res.json({
      user: user.toObject(),
      profile: profile ? profile.toObject() : null,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
});

router.post("/start-conversation", async (req, res) => {
  try {
    const { userId, partnerId } = req.body;
    console.log('the start conversation is backend ',userId,partnerId)

    if (!userId || !partnerId) {
      return res
        .status(400)
        .json({ message: "Both userId and partnerId are required" });
    }

    // Check if conversation exists
    const existingMessages = await MessageModel.find({
      $or: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
    }).sort({ timestamp: -1 });

    console.log('the existing backend messsage',existingMessages)

    const partnerUser = await userModel.findById(partnerId).select("-password");

    console.log('the partnerUser',partnerUser)

    if (!partnerUser) {
      return res.status(404).json({ message: "Partner user not found" });
    }

    res.status(200).json({
      conversation: {
        partnerUser: partnerUser.toObject(),
        lastMessage: existingMessages[0] || null,
        unreadCount: 0,
      },
    });
  } catch (error) {
    console.error("Error starting conversation:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
