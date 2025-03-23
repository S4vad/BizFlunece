import InfluencerProfile from "../models/InfluencerProfile.js";
import FavInfluencer from "../models/FavInfluencers.js";

export async function InfluencerList(req, res) {
  try {
    const influencers = await InfluencerProfile.find();

    console.log(influencers);
    if (!influencers) {
      return res.status(400).json({ error: "No influencer found" });
    }

    res.status(200).json({ success: true, data: influencers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addFavInfluencers(req, res) {
  try {
    const { influencerId, businessId } = req.body;
    let favList = await FavInfluencer.findOne({ businessId });

    if (favList) {
      if (favList.influencerId.includes(influencerId)) {
        return res.status(400).json({ success:false,error: "Influencer already added" });
      } else {
        favList.influencerId.push(influencerId);
       
      }
    }else{
      favList = new FavInfluencer({
        businessId,
        influencerId:[influencerId]
      })
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
    
    favList.influencerId = favList.influencerId.filter(id => id.toString() !== influencerId.toString());
    await favList.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function favoriteInfluencers(req,res) {
  try {
    const {businessId}=req.params;
    const response = await FavInfluencer.findOne({ businessId }).populate("influencerId");
    console.log('the fav influecers',response)
    if (!response) {
     return  res.status(200).json({ success: true, data: response.influencerId || [] });
    }
    res.status(200).json({ success: true, data: response.influencerId });
    

    
  } catch (error) {
    res.status(500).json({error:"internal server error"})
    
  }
  
}
