import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const InfluencerCard = ({
  influencer,
  index,
  addFavInfluencer,
  removeInfluencer,
  favoriteInfluencers
}) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(()=>{
    if(favoriteInfluencers.includes(influencer._id)){
      setHasLiked(true)
    }
  },[favoriteInfluencers,influencer._id])

  const handleLike = async () => {
    try {
      if (hasLiked) {
        const response = await removeInfluencer(influencer._id);
        if (response.success) setHasLiked(false);
      } else {
        const response = await addFavInfluencer(influencer._id);
        if (response.success) setHasLiked(true);
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  return (
    <div
      key={index}
      className="relative rounded-lg border p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          <span className="text-gray-500">JD</span>
        </div>
        <div>
          <h3 className="font-semibold">{influencer.name}</h3>
          <p className="text-gray-600">{influencer.niche}</p>
        </div>
        <button
          onClick={handleLike}
          className="absolute right-2 top-2 z-10 transform transition-transform hover:scale-110"
        >
          {hasLiked ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <p className="text-sm text-gray-500">Followers</p>
          <p className="font-semibold">{influencer.followers}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Engagement</p>
          <p className="font-semibold">{influencer.engagement}</p>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;

InfluencerCard.propTypes = {
  influencer: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Added _id
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    engagement: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  addFavInfluencer: PropTypes.func.isRequired,
};
