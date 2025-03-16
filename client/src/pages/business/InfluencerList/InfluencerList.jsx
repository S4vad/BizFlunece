

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function InfluencerList() {
  const navigate = useNavigate();

  const influencers = [
    {
      name: "John Doe",
      followers: "120K",
      engagement: "4.8%",
      niche: "Fashion",
    },
    {
      name: "Sarah Smith",
      followers: "85K",
      engagement: "6.2%",
      niche: "Tech",
    },
    { name: "Savad", followers: "2.5M", engagement: "48%", niche: "Tech" },
    { name: "Sunoos", followers: "5.5M", engagement: "48%", niche: "Gamer" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3">
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            New Campaign
          </button>
        </div>
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Find Influencers</h2>
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Search by niche or name..."
              className="flex-1 rounded-lg border px-4 py-2 bg-white"
            />
            <select className="rounded-lg border px-4 py-2 bg-white">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {influencers.map((influencer, index) => (
              <DashboardItem
                key={index}
                influencer={influencer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardItem = ({ influencer, index }) => {
  const [hasLiked, setHasLiked] = useState(false);

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
          onClick={() => setHasLiked(!hasLiked)}
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


DashboardItem.propTypes = {
  influencer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    engagement: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
  }).isRequired,
   index: PropTypes.number.isRequired,
};