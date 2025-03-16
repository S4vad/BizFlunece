import mongoose from "mongoose";
const Fav = new mongoose.Schema({
  BusinessId:{type:Number,required:true},
  InfluencerId: { type: Number, required: true }
});


const FavInfluencer = mongoose.model('FavInfluencer',Fav)

export default FavInfluencer;
