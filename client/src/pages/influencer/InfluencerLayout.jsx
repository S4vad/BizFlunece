
import UserRoutes from "@/routes/UserRoutes";
import Navbar from "./Navbar";

const InfluencerLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pb-24 bg-white" >
        <UserRoutes />
      </div>

    </>
  );
};

export default InfluencerLayout;
