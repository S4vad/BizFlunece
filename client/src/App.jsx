import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/Main";
import SignupPage from "./components/SignUP";
import UserLogin from "./components/UserLogin";
import CampaignPage from "./pages/business/Campaign";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectedRoute";
import InfluencerLayout from "./pages/influencer/InfluencerLayout";
import BusinessLayout from "./pages/business/BusinessLayout";
import InfluencerDetails from "@/pages/business/InfluencerList/components/InfluencerDetails";
import MessagesLayout from "@/pages/Message/MessagesLayout";
import BuisnessProfile from "@/pages/business/BusinessProfile/BuisnessProfile";
import { initSocket } from "./utils/socket";
import { useAuth } from "./context/AuthContext";
import ForgotPasswordPage from "./components/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword";

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

function PublicRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const dashboardPath =
      user.role === "business"
        ? "/business/dashboard"
        : "/influencer/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <>
      <SocketInitializer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <UserLogin />
            </PublicRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/campaign" element={<CampaignPage />} />
        <Route path="/influencer-details/:id" element={<InfluencerDetails />} />
     
        {/* Protected Message routes */}
        <Route
          path="/conversation/messages"
          element={
            <ProtectedRoute>
              <MessagesLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/conversation/messages/:userId"
          element={
            <ProtectedRoute>
              <MessagesLayout />
            </ProtectedRoute>
          }
        />

        {/* Protected Business Profile */}
        <Route
          path="/business/profile"
          element={
            <ProtectedRoute role="business">
              <BuisnessProfile />
            </ProtectedRoute>
          }
        />

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
