import UserRoutes from "@/routes/UserRoutes";
import Navbar from "@/pages/influencer/Navbar";

const InfluencerLayout = () => {
  return (
    <>
      <Navbar />
      <UserRoutes />
    </>
  );
};

export default InfluencerLayout;
