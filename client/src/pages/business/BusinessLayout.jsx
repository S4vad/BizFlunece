
import Footer from "@/components/Footer";
import Navbar from "./Navbar";

import BusinessRoutes from "@/routes/BusinessRoutes";

const BusinessLayout = () => {
  return (
    <>
      <Navbar/>
      <main className="mb-24">
        <BusinessRoutes/>
      </main>
      <Footer />

    </>
  );
};

export default BusinessLayout;
