import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/Main";
import SignupPage from "./components/SignUP";
import UserLogin from "./components/UserLogin";
import Campaign from "./pages/Business/Campaign";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import InfluencerLayout from "./pages/influencer/InfluencerLayout";
import BusinessLayout from "./pages/business/BusinessLayout";
import InfluencerDetails from "@/pages/business/InfluencerList/components/InfluencerDetails";
import MessagesLayout from "./pages/Message/MessagesLayout";
import BuisnessProfile from "@/pages/business/BusinessProfile/BuisnessProfile";
import { initSocket } from "./utils/socket";
import { useAuth } from "./context/AuthContext";

// Component to handle socket initialization
function SocketInitializer() {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.id) {
      const socket = initSocket(user.id);
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <SocketInitializer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<UserLogin />} />
        
        {/* Public routes that might need auth context */}
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/influencer-details/:id" element={<InfluencerDetails />} />
        <Route path="/conversation/messages" element={<MessagesLayout />} />
        <Route path="/conversation/messages/:userId" element={<MessagesLayout />} />
        <Route path="/business/profile" element={<BuisnessProfile />} />

        {/* Protected Influencer Routes */}
        <Route
          path="/influencer/*"
          element={
            <ProtectedRoute role="influencer">
              <InfluencerLayout />
            </ProtectedRoute>
          }
        />

        {/* Protected Business Routes */}
        <Route
          path="/business/*"
          element={
            <ProtectedRoute role="business">
              <BusinessLayout />
            </ProtectedRoute>
          }
        />

        {/* Fallback route - redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}