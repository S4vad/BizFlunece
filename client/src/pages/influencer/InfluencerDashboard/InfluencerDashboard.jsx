import StatCard from "./components/StatCard";
import CampaignTimeline from "./components/CampaignTimeline";
import NotificationPanel from "./components/NotificationPanel";
import {
  MdEmail,
  MdCalendarToday,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InfluencerDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaigns,setActiveCampaigns]=useState([])
  const [notifications,setNotifications] = useState([])
  useEffect(() => {
    const fetchUserCampaign = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const res = await axios(`/influencer/get-user-campaigns/${userId}`);
        setCampaigns(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserCampaign();
  }, []);

  useEffect(() => {
  const approvedCampaign = campaigns.filter(
    (campaign) => campaign.adminResponse.status === "approved"
  );
  setActiveCampaigns(approvedCampaign);
}, [campaigns]); 


 useEffect(() => {
  const getNotifications=async()=>{
    try {
       const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
      const res=await axios(`/influencer/get-notifications?userId=${userId}`)
      setNotifications(res.data.data)   
    } catch (error) {
      console.log(error.message)      
    }
  }
  getNotifications()
 }, []);
  return (
    <>
      <div className="mb-10 mt-6 flex justify-evenly gap-6 p-5">
        <StatCard title="Active Campaigns" value="5" change="+2" />
        <StatCard title="Avg. Engagement" value="8.2%" change="-0.5%" />
        <StatCard title="Pending Earnings" value="$2,450" />
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 px-10 md:grid-cols-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-600 active:scale-95">
          <MdEmail className="h-5 w-5 fill-white" />
          New Proposals (3)
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-500 py-3 font-semibold text-gray-700 shadow-md transition-all hover:bg-gray-100 active:scale-95">
          <MdCalendarToday className="h-5 w-5 fill-blue-600" />
          <p className="text-blue-500">Content Calendar</p>
        </button>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9c27b0] py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-800 active:scale-95">
          <MdAccountBalanceWallet className="h-5 w-5 fill-white" />
          Withdraw Earnings
        </button>
      </div>

      <div className="mx-8 mb-10 mt-6 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg">Active Campaigns </h2>
        <CampaignTimeline campaigns={activeCampaigns} />
      </div>

      <div className="mx-8 mt-6 rounded-xl border-2 border-b-2 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg">Notifications</h2>
        <NotificationPanel notifications={notifications} />
      </div>
       <div className="mx-8 mb-10 mt-6 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg">Campaign Timeline</h2>
        <CampaignTimeline campaigns={campaigns} />
      </div>
    </>
  );
}
