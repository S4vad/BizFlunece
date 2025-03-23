import { useEffect, useState } from "react";
import InfluencerCard from "./components/InfluencerCard";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function InfluencerList() {
  const { user } = useAuth();
  const [influencers, setInfluencers] = useState([]);
  const [favoriteInfluencers, setFavoriteInfluencers] = useState(new Set());

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const { data } = await axios.get("/business/influencerlist");
        setInfluencers(data.data);
      } catch (error) {
        console.log("Error fetching infleunceres", error);
      }
    };

    const fetchFavoriteInfluencers = async () => {
      try {
        const businessId = user.id;
        const { data } = await axios.get(
          `/business/favoriteInfluencers/${businessId}`,
        );
        const favIds = data.data || [];
        console.log("the fav id in front ed", favIds);
        setFavoriteInfluencers(new Set(favIds.map((inf) => inf._id.toString())));
      } catch (error) {
        console.log("Error fetching FavInfluencer", error);
      }
    };

    fetchInfluencers();
    fetchFavoriteInfluencers();
  }, [user.id]);


  const toggleFavorite = async (influencerId) => {
    try {
      if (favoriteInfluencers.has(influencerId)) {
        await axios.post("/business/removeFav", {
          influencerId,
          businessId: user.id,
        });
        setFavoriteInfluencers((prev) => {
          const newFavorites = new Set(prev);
          newFavorites.delete(influencerId);
          return newFavorites;
        });
        toast.success("Removed from favorites");
      } else {
        await axios.post("business/addFav", {
          influencerId,
          businessId: user.id,
        });
        setFavoriteInfluencers((prev) => new Set(prev).add(influencerId));
        toast.success("Added successfully");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("An error occurred");
    }
  };

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
              className="flex-1 rounded-lg border bg-white px-4 py-2"
            />
            <select className="rounded-lg border bg-white px-4 py-2">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {influencers.map((influencer, index) => (
              <InfluencerCard
                key={index}
                influencer={influencer}
                isFavorite={favoriteInfluencers.has(influencer._id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
