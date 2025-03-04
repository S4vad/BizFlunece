import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Main";
import SignupPage from "./components/SignUP";
import Dashboard from "./pages/business/Dashboard";
import UserLogin from "./components/UserLogin";
import Campaign from "./pages/Business/Campaign";
import Profile from "./pages/influencer/Profile";
import userRoutes from "./components/protectedRoute";
import { AuthProvider } from "./context/AuthContext";
import userRoutes from "./routes/userRoutes";
import BusinessRoutes from "./routes/BusinessRoutes";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/influencer/*"
          element={
            <protectedRoute role="influencer">
              <userRoutes />
            </protectedRoute>
          }
        />

        {/* <Route element={<protectedRoute role="influcnecer" />}>
          <userRoutes /> this is an old way but v6 not support withoout path
        </Route> */}
        <Route
          path="/business/*"
          element={
            <protectedRoute role="business">
              <BusinessRoutes />
            </protectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
