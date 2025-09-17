import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ActiveCampaign() {
  const [campaigns, setCampaigns] = useState([]);
    const { user } = useAuth();

  useEffect(() => {
    const fecthCampaigns = async () => {
      try {
        const { data } = await axios.get(`/business/campaigns/${user.id}`);
        setCampaigns(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.id) {
      fecthCampaigns();
    }
  }, [user.id]);
  const toggleCampaignStatus = async (id, status) => {
    const pass = status === "Active" ? "Disabled" : "Active";

    await axios.post("/business/campaign-status-update", {
      status: pass,
      campaignId: id,
    });

    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign._id === id
          ? {
              ...campaign,
              status: campaign.status === "Active" ? "Disabled" : "Active",
            }
          : campaign,
      ),
    );
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div
          key={campaign._id}
          className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {campaign.title}
              </h3>
              <p className="text-md text-gray-400">{campaign.description}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium transition-colors ${
                      campaign.status === "Active"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </p>
                <p>
                  Budget: <span className="font-medium">{campaign.budget}</span>
                </p>
                <p>
                  Deadline:{" "}
                  <span className="font-medium">{campaign.duration} Days</span>
                </p>
                <p>
                  Target Audiences:{" "}
                  <span className="font-medium">{campaign.targetAudience}</span>
                </p>
                <p>
                  Influencers:{" "}
                  <span className="font-medium">
                    {/* {campaign.influencers.join(", ")} */}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                toggleCampaignStatus(campaign._id, campaign.status)
              }
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                campaign.status === "Active"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {campaign.status === "Active" ? "Disable" : "Activate"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
