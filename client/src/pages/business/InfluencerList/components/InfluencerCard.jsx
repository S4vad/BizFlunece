import { useState } from "react";

const InfluencerCard = ({ influencer, isFavorite, toggleFavorite }) => {
  const [isPreview, setIsPreview] = useState(false);
  
  return (
    <div className="relative rounded-lg border p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center">
          <img
            src={influencer.image || "/image.png"}
            alt="influencer"
            className={`cursor-pointer rounded-full bg-gray-200 object-cover transition-all duration-300 ${
              isPreview ? "absolute h-32 w-32" : "relative h-12 w-12"
            }`}
            onClick={() => setIsPreview(true)}
            onMouseLeave={() => isPreview && setIsPreview(false)}
          />
        </div>
        <div>
          <h3 className="font-semibold">{influencer.name}</h3>
          <p className="text-sm text-gray-400">{influencer.bio}</p>
        </div>

        <button
          onClick={() => toggleFavorite(influencer._id)}
          className="absolute right-2 top-2 z-10 transform transition-transform hover:scale-110"
        >
          {isFavorite ? "❤️" : "🤍"}
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
