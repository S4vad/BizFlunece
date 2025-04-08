import InfluencerProfile from "../models/InfluencerProfile.js";
import FavInfluencer from "../models/FavInfluencers.js";
import campaignData from "../models/campaignData.js";
import CompanyProfile from "../models/BusinessProfile.js";

export async function InfluencerList(req, res) {
  try {
    const influencers = await InfluencerProfile.find();

    if (!influencers.length)
      return res.status(400).json({ error: "No influencer found" });

    res.status(200).json({ success: true, data: influencers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addFavInfluencers(req, res) {
  try {
    const { influencerId, businessId } = req.body;
    let favList = await FavInfluencer.findOne({ businessId });

    if (!favList) {
      favList = new FavInfluencer({ businessId, influencerId: [influencerId] });
    } else if (favList.influencerId.includes(influencerId)) {
      return res
        .status(400)
        .json({ success: false, error: "Influencer already added" });
    } else {
      favList.influencerId.push(influencerId);
    }

    await favList.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function removeFavInfluencers(req, res) {
  try {
    const { influencerId, businessId } = req.body;
    let favList = await FavInfluencer.findOne({ businessId });

    if (!favList)
      return res
        .status(400)
        .json({ success: false, error: "No favorites found" });

    favList.influencerId = favList.influencerId.filter(
      (id) => id.toString() !== influencerId.toString()
    );
    await favList.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function favoriteInfluencers(req, res) {
  try {
    const { businessId } = req.params;
    const response = await FavInfluencer.findOne({ businessId }).populate(
      "influencerId"
    );

    res.status(200).json({ success: true, data: response?.influencerId || [] });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}

export async function createCampaign(req, res) {
  try {
    const {
      businessId,
      title,
      description,
      budget,
      targetAudience,
      duration,
      deliverables,
      platforms,
      location,
      companyName,
      videoDuration,
    } = req.body;



    const companyProfile = await CompanyProfile.findOne({ userId: businessId });


    if (!companyProfile) {
      return res
        .status(404)
        .json({ success: false, error: "Company profile not found" });
    }

    const companyImage = companyProfile.image || null;
    const videoAd = req.file ? req.file.path : null;

    const newCampaign = await campaignData.create({
      businessId,
      title,
      description,
      budget,
      targetAudience,
      duration,
      deliverables,
      platforms: Array.isArray(platforms) ? platforms : JSON.parse(platforms),
      videoAd,
      location,
      companyName,
      videoDuration,
      companyImage
    });

    res.status(200).json({
      success: true,
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export async function getCompanyProfile(req, res) {
  try {
    const userId = req.params.userId;
    console.log("the user id is", userId);
    console.log("itfrom admin")
    const profile = await CompanyProfile.findOne({ userId });


    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function companyProfileUpdate(req, res) {
  try {
    const { userId } = req.params;
    const updatedProfile = await CompanyProfile.findOneAndUpdate(
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

export async function updateCompanyImage(req, res) {
  try {
    const { userId } = req.params;
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path; //cloudinary image url

    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      { userId },
      { $set: { image: imageUrl } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ 
        success: false,
        error: "Company profile not found" 
      });
    }
    console.log("the imgea rl is", imageUrl);
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.log("image upload error", error);
      res.status(500).json({ 
      success: false,
      error: "Failed to update company profile image" 
    });
  }
}


