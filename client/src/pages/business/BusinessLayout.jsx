import Navbar from "@/pages/influencer/Navbar";
import BusinessRoutes from "@/routes/BusinessRoutes";

const BusinessLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <BusinessRoutes />
      </main>
    </>
  );
};

export default BusinessLayout;
