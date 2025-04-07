
import CampaignCard from "./components/CampaignCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get("influencer/campaignlist");
        console.log(data);
        setCampaigns(data.data)
      } catch (error) {
        console.log(error);
        toast.error('Error fetching campaigns');  
      }
    };
    fetchCampaigns();
  }, []);
  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-8">
     {campaigns.length > 0 ? (
        campaigns.map((item) => <CampaignCard key={item._id} item={item} />)
      ) : (
        <p className="text-center text-gray-500">No campaigns available.</p>
      )}
    </div>
  );
}
