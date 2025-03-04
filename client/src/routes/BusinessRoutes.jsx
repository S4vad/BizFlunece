import {Routes,Route} from "react-router-dom"
import BusinessDashboard from "../pages/business/BusinessDashboard";
import CampaignCreator from "../pages/business/CampaignCreator"


export default BusinessRoutes(){
  return (
    <Routes>
      <Route path='dashboard' element={<BusinessDashboard/>} />
      <Route path='create-campaign' element={<CampaignCreator/>} />
    </Routes>
  )
}