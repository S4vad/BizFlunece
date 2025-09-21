import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import InfluencerCard from "../InfluencerList/components/InfluencerCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Favorite() {
  const [favoriteInfluencers, setFavoriteInfluencers] = useState([]); 
  const [clicked, setClicked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user?.id) return;

    const fetchFavoriteInfluencers = async () => {
      try {
        const { data } = await axios.get(
          `/business/favoriteInfluencers/${user.id}`
        );
        setFavoriteInfluencers(data.data || []); 
      } catch (error) {
        console.log("Error fetching influencers", error.response?.data || error.message);
      }
    };

    fetchFavoriteInfluencers();
  }, [user?.id]);


  const toggleFavorite = async (influencerId) => {
    try {
      const isFavorite = favoriteInfluencers.some((inf) => inf._id === influencerId);

      if (isFavorite) {
        await axios.post("/business/removeFav", { influencerId, businessId: user.id });
        setFavoriteInfluencers((prev) =>
          prev.filter((inf) => inf._id !== influencerId)
        );
        toast.success("Removed from favorites");
      } else {
        await axios.post("/business/addFav", { influencerId, businessId: user.id });


        const newInfluencer = { _id: influencerId };
        setFavoriteInfluencers((prev) => [...prev, newInfluencer]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {favoriteInfluencers.length > 0 ? (
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-sm">
          <div className="flex flex-col space-y-4">
            {favoriteInfluencers.map((item) => (
              <InfluencerCard
                key={item._id}
                influencer={item}
                toggleFavorite={toggleFavorite}
                isFavorite={true} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-center text-lg text-gray-500">
          <p>No influencers Added.</p>
          <span className="ml-5 text-indigo-600"> Add Influencer</span>
          <div
            className="inline-flex cursor-pointer align-middle"
            onClick={() => {
              setClicked(true);
              setTimeout(() => {
                navigate("/business/influencerlist");
              }, 1400);
            }}
          >
            <AiOutlineArrowRight
              className={`fill-indigo-600 text-indigo-600 hover:translate-x-4 hover:fill-indigo-500 hover:transition-all hover:delay-200 hover:duration-300 ${
                clicked ? "animate-move-arrow" : ""
              }`}
              size={20}
            />
          </div>
        </div>
      )}
    </div>
  );
}
