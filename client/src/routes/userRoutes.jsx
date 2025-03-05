import {Routes,Route} from 'react-router-dom'
import InfluencerProfile from '@/pages/influencer/InfluencerProfile/InfluencerProfile'
import InflencerDashboard from '@/pages/influencer/InfluencerDashboard/InfluencerDashboard'



export default function UserRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<InflencerDashboard />} />
      <Route path="profile" element={<InfluencerProfile/>} />
    </Routes>
  )
}
