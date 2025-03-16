import Footer from "@/components/Footer";
import UserRoutes from "@/routes/UserRoutes";
import Navbar from "./Navbar";

const InfluencerLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mb-24">
        <UserRoutes />
      </div>
      <Footer/>
    </>
  );
};

export default InfluencerLayout;
