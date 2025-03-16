import { Routes, Route, Navigate } from "react-router-dom";
import BusinessDashboard from "@/pages/business/Dashboard/BusinessDashboard";
import InfluencerList from "@/pages/business/InfluencerList/InfluencerList";
import CreateCampaign from "@/pages/business/CampaignCreator/CreateCampaign";

export default function BusinessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/business/dashboard" />} />
      <Route path="dashboard" element={<BusinessDashboard />} />
      <Route path="influencerList" element={<InfluencerList />} />
      <Route path="createcampaign" element={<CreateCampaign />} />
    </Routes>
  );
}
