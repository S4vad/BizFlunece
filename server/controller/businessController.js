import InfluencerProfile from "../models/InfluencerProfile.js";
import FavInfluencer from "../models/FavInfluencers.js";
import campaignData from "../models/campaignData.js";

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

    console.log("Uploaded file details:", req.file);

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
