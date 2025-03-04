import {Routes,Route} from 'react-router-dom'
import InfluencerCampaign from '@/pages/influencer/Campaign';
import ProfilePage from '@/pages/influencer/Profile';



export default function userRoutes() {
  return (
    <Routes>
      <Route path="Campaign" element={<InfluencerCampaign />} />
      <Route path="profile" element={<ProfilePage/>} />
    </Routes>
  )
}
