import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Main";
import SignupPage from "./components/SignUP";
import UserLogin from "./components/UserLogin";
import Campaign from "./pages/Business/Campaign";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import InfluencerLayout from "./pages/influencer/InfluencerLayout";
import BusinessLayout from "./pages/business/BusinessLayout";
import InfluencerDetails from "@/pages/business/InfluencerList/components/InfluencerDetails";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/influencer-details/:id" element={<InfluencerDetails />} />

        <Route
          path="/influencer/*"
          element={
            <ProtectedRoute role="influencer">
              <InfluencerLayout />
            </ProtectedRoute>
          }
        />

        {/* <Route element={<protectedRoute role="influcnecer" />}>
          <userRoutes /> this is an old way but v6 not support withoout path
        </Route> */}
        <Route
          path="/business/*"
          element={
            <ProtectedRoute role="business">
              <BusinessLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
