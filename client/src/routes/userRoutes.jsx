import { Routes, Route, Navigate } from "react-router-dom";
import InfluencerProfile from "@/pages/influencer/InfluencerProfile/InfluencerProfile";
import InflencerDashboard from "@/pages/influencer/InfluencerDashboard/InfluencerDashboard";
import CampaignList from "@/pages/influencer/CampaignList/CampaignList";
import MessagesLayout from "@/pages/Message/MessagesLayout";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/influencer/dashboard" />} />
      <Route path="/dashboard" element={<InflencerDashboard />} />
      <Route path="/profile" element={<InfluencerProfile />} />
      <Route path="/campaignlist" element={<CampaignList />} />
      <Route path="/messages" element={<MessagesLayout />} />
      <Route path="/messages/:id" element={<MessagesLayout />} />
    </Routes>
  );
}
