import { useEffect, useState } from "react";
import InfluencerCard from "./components/InfluencerCard";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function InfluencerList() {
  const { user } = useAuth();
  const [influencers, setInfluencers] = useState([]);
  const [favoriteInfluencers, setFavoriteInfluencers] = useState([]);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await axios.get("/business/influencerlist");
        setInfluencers(response.data.data);
      } catch (error) {
        console.log("Error fetching infleunceres", error);
      }
    };


    const fetchFavoriteInfluencers = async () => {
      try {
        const businessId = user.id;
        const response = await axios.get(`/business/favoriteInfluencers/${businessId}`);
        
        // Ensure it's an array of IDs
        const favIds = response.data.data?.influencerId || [];
        setFavoriteInfluencers(favIds.map(id => id.toString())); 
      } catch (error) {
        console.log("Error fetching FavInfluencer", error);
      }
    };

    fetchInfluencers();
    fetchFavoriteInfluencers();
  }, []);

  const addFavInfluencer = async (id) => {
    const influencerId = id;
    const businessId = user.id;
    console.log(influencerId, businessId);

    try {
      const response = await axios.post("/business/addFav", {
        influencerId,
        businessId,
      });

      if (response.data.success) {
        toast.success("Added successfully");

        setFavoriteInfluencers((prevInfluencers) => [
          ...prevInfluencers,
          influencerId,
        ]);
      } else {
        toast.error("Failed to add influencer");
      }
    } catch (error) {
      console.error("Error adding influencer:", error);
      toast.error("An error occurred");
    }
  };

  const removeInfluencer = async (id) => {
    try {
      const response = await axios.post("/business/removefav", { influencerId: id, businessId: user.id });
  
      if (response.data.success) {
        toast.success("Removed from favorites");
  
        // Update state correctly
        setFavoriteInfluencers(prev => prev.filter(favId => favId !== id));
      } else {
        toast.error("Failed to remove influencer");
      }
    } catch (error) {
      console.error("Error removing influencer:", error);
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
                index={index}
                addFavInfluencer={addFavInfluencer}
                removeInfluencer={removeInfluencer}
                favoriteInfluencers={favoriteInfluencers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
