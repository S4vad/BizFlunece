import CampaignCard from "./components/CampaignCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getUserFromStorage } from "@/utils/LocalStorage";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const user = getUserFromStorage();

  useEffect(() => {
    const fetchInitialCampaign = async () => {
      try {
        const { data } = await axios.get("/influencer/campaignlist");
        const campaignsData = data?.data || [];

        if (campaignsData.length === 0) return;

        setCampaigns(campaignsData);

        const firstCampaign = campaignsData[0];
        setSelectedCampaign(firstCampaign);

        const res = await axios.get("/campaign-participation-status", {
          params: {
            campaignId: firstCampaign._id,
            userId: user.id,
          },
        });

        setShowButton(res?.data?.button ?? false);
      } catch (error) {
        console.error("Error fetching initial campaign data:", error);
      }
    };

    fetchInitialCampaign();
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

      await axios
        .get(
          `/campaign-participation-status?campaignId=${id}&userId=${user.id}`,
        )
        .then((res) => {
          setShowButton(res.data.button);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIntrested = async (campaign) => {
    try {
      await axios.post("/campaign-participation/", {
        campaignId: campaign._id,
        userId: user.id,
        campaignOwner: campaign.businessId,
      });
      toast.success("Campaign Interest send");
      setShowButton(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send Interest");
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
      <div className="sticky top-0 hidden h-full w-full overflow-y-auto rounded-2xl bg-white p-8 shadow-md md:block md:w-1/2">
        {selectedCampaign && (
          <div className="relative flex h-full flex-col justify-start">
            {showButton && (
              <div className="absolute right-3 top-3">
                <button
                  onClick={() => handleIntrested(selectedCampaign)}
                  className="group relative flex h-[1.8rem] cursor-pointer items-center overflow-hidden rounded-[0.6rem] bg-[#4b48ff] px-2 py-[0.35em] pl-5 text-[14px] font-medium text-white shadow-[inset_0_0_1.6em_-0.6em_#714da6]"
                >
                  <span className="mr-10 text-white">Interested</span>
                  <div className="absolute right-[0.3em] flex h-[1.6em] w-[1.6em] items-center justify-center rounded-[0.7em] bg-white shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] transition-all duration-300 active:scale-95 group-hover:w-[calc(100%-0.6em)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="w-[1.1em] text-[#7b52b9] transition-transform duration-300 group-hover:translate-x-[0.1em]"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            )}

            <div className="mb-6 flex items-center gap-4">
              {selectedCampaign.companyImage && (
                <img
                  src={selectedCampaign.companyImage}
                  alt="Company"
                  className="h-16 w-16 rounded-full object-cover shadow-md"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedCampaign.title}
                </h2>
                <p className="text-gray-500">{selectedCampaign.companyName}</p>
              </div>
            </div>

            <div className="mb-6 space-y-3 text-sm text-gray-700">
              <p>{selectedCampaign.description}</p>
              <p>
                <strong>Location:</strong> {selectedCampaign.location}
              </p>
              <p>
                <strong>Budget:</strong> ₹{selectedCampaign.budget}
              </p>
              <p>
                <strong>Platforms:</strong>{" "}
                {selectedCampaign.platforms.join(", ")}
              </p>
            </div>

            {/* Video */}
            {selectedCampaign.videoAd && (
              <div className="mt-4">
                <h3 className="mb-2 font-medium text-gray-700">
                  Campaign Video
                </h3>
                <div className="w-full max-w-md">
                  <video
                    src={selectedCampaign.videoAd}
                    controls
                    className="h-auto w-full rounded-xl shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
