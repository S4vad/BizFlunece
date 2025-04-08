import CampaignCard from "./components/CampaignCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    axios.get("/influencer/campaignlist").then((res) => {
      setCampaigns(res.data.data);
      setSelectedCampaign(res.data.data[0]); 
    });
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get("/influencer/campaignlist");
        console.log(data);
        setCampaigns(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching campaigns");
      }
    };
    fetchCampaigns();
  }, []);

  const handleCard = async (id) => {
    try {
      const { data } = await axios.get("/influencer/get-single-campaign", {
        params: { campaignId: id },
      });
      setSelectedCampaign(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen gap-4 overflow-hidden bg-gray-100 p-6">
      <div className="w-full space-y-4 overflow-y-auto md:w-1/2">
        {campaigns.length > 0 ? (
          campaigns.map((item) => (
            <CampaignCard key={item._id} item={item} handleCard={handleCard} />
          ))
        ) : (
          <p className="text-center text-gray-500">No campaigns available.</p>
        )}
      </div>

      <div className="hidden h-full w-full overflow-y-auto rounded-2xl sticky top-0 bg-white p-6 shadow-md md:block md:w-1/2">
        {selectedCampaign && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              {selectedCampaign.title}
            </h2>
            <p className="mb-2 text-gray-600">{selectedCampaign.description}</p>
            <p className="mb-2">Company: {selectedCampaign.companyName}</p>
            <p className="mb-2">Location: {selectedCampaign.location}</p>
            <p className="mb-2">Budget: ₹{selectedCampaign.budget}</p>
            <p className="mb-2">
              Platforms: {selectedCampaign.platforms.join(", ")}
            </p>
            <img
              src={selectedCampaign.companyImage}
              className="mt-4 w-32 rounded-xl"
              alt="Company"
            />
          </div>
        )}
      </div>
    </div>
  );
}
