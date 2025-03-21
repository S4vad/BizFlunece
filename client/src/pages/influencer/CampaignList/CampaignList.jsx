import campaignData from "@/data/campaign";
import CampaignCard from "./components/CampaignCard";

export default function CampaignList() {
  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-8">
      {campaignData.map((item) => (
        <CampaignCard key={item.id} item={item} />
      ))}
    </div>
  );
}