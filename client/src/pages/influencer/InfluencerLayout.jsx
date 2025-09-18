import UserRoutes from "@/routes/userRoutes";
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
