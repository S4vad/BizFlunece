
import Navbar from "./Navbar";

import BusinessRoutes from "@/routes/BusinessRoutes";

const BusinessLayout = () => {
  return (
    <>
      <Navbar/>
      <main className="">
        <BusinessRoutes/>
      </main>


    </>
  );
};

export default BusinessLayout;
