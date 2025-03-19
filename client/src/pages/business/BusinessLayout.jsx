
import Navbar from "./Navbar";

import BusinessRoutes from "@/routes/BusinessRoutes";

const BusinessLayout = () => {
  return (
    <>
      <Navbar/>
      <main className="pb-24">
        <BusinessRoutes/>
      </main>


    </>
  );
};

export default BusinessLayout;
