const InfluencerCard = ({ influencer, isFavorite, toggleFavorite }) => {
  return (
    <div className="relative rounded-lg border p-4 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          <span className="text-gray-500">JD</span>
        </div>
        <div>
          <h3 className="font-semibold">{influencer.name}</h3>
          <p className="text-gray-600">{influencer.niche}</p>
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
