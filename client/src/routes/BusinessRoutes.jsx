import {Routes,Route} from "react-router-dom"
import BusinessDashboard from "@/pages/business/Dashboard/BusinessDashboard";
import InfluencerList from "@/pages/business/InfluencerList/InfluencerList";


export default function BusinessRoutes(){
  return (
    <Routes>
      <Route path='dashboard' element={<BusinessDashboard/>} />
      <Route path='influencer-list' element={<InfluencerList/>} />
    </Routes>
  )
}