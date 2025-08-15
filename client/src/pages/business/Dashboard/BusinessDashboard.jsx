import StatCard from "@/pages/influencer/InfluencerDashboard/components/StatCard";
import ActiveCampaign from "./components/ActiveCampaign";
import RecentActivities from "./components/RecentActivities";
import { useNavigate } from "react-router-dom";
import InfluencerRequests from "./components/InfluencerRequests";

export default function BusinessDashboard() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Business Dashboard
          </h1>
          <button onClick={()=>navigate('/business/createcampaign')} className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700">
            + Create New Campaign
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-20 md:grid-cols-4">
          <StatCard title="Total Spent" value="$8,000" />
          <StatCard title="ROI" value="32%" />
          <StatCard title="Active Campaigns" value="2" />
          <StatCard title="Completed Campaigns" value="5" />
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            {" "}
            Active Campaigns{" "}
          </h2>
          <ActiveCampaign />
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Influencer Requests</h2>
          <InfluencerRequests />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Recent Activities
          </h2>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}
