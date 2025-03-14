import { useState } from "react";

export default function ActiveCampaign() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Collection Launch",
      status: "Active",
      influencers: ["@fashionista", "@styleguru"],
      budget: "$5,000",
      deadline: "2024-07-15",
    },
    {
      id: 2,
      name: "Product Launch",
      status: "Disable", 
      influencers: ["@techreviewer"],
      budget: "$3,000",
      deadline: "2024-06-30",
    },
  ]);
  const toggleCampaignStatus = (id) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign.id === id
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
          key={campaign.id}
          className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-blod text-xl text-gray-900">
                {campaign.name}
              </h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  Status: <span className="font-medium">{campaign.status}</span>
                </p>
                <p>
                  Budget: <span className="font-medium">{campaign.budget}</span>
                </p>
                <p>
                  Deadline:{" "}
                  <span className="font-medium">{campaign.deadline}</span>
                </p>
                <p>
                  Influencers:{" "}
                  <span className="font-medium">
                    {campaign.influencers.join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleCampaignStatus(campaign.id)}
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
