import mongoose from "mongoose";
const Fav = new mongoose.Schema({
  businessId: { type: String, required: true },
  influencerId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "InfluencerProfile",
    required: true,
    unique:true
  },]
});

const FavInfluencer = mongoose.model("FavInfluencer", Fav);

export default FavInfluencer;
