import { AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import InfluencerCard from "../InfluencerList/components/InfluencerCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Favorite() {
  const [influencers, setInfluencers] = useState([]);
  const [clicked, setClicked] = useState(false);
  const {user} = useAuth();


  const navigate = useNavigate();

  useEffect(() => {

    const fetchInfluencers = async () => {
      console.log('ther user is ',user)
      if (!user || !user.id) return;

      try {
        const { data } = await axios.get(
          `/business/favoriteInfluencers/${user.id}`,
        );
        console.log("The influencers are", data);
        setInfluencers(data.data);
      } catch (error) {
        console.log("Error fetching influencers:", error);
      }
    };

    fetchInfluencers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {influencers.length > 0 ? (
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-sm">
          <div className="flex flex-col space-y-4">
            {influencers.map((item, index) => (
              <InfluencerCard key={index} influencer={item} />
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
