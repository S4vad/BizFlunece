import {Routes,Route} from 'react-router-dom'
import InfluencerProfile from '@/pages/influencer/InfluencerProfile/InfluencerProfile'
import InflencerDashboard from '@/pages/influencer/InfluencerDashboard/InfluencerDashboard'
import CampaignList from "@/pages/influencer/CampaignList/CampaignList"



export default function UserRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<InflencerDashboard />} />
      <Route path="profile" element={<InfluencerProfile/>} />
      <Route path='campaignlist' element={<CampaignList/>} />
    </Routes>
  )
}
