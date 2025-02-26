import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupLogin";
import Dashboard from "./pages/Dashboard";
import UserLogin from "./pages/UserLogin";
import Campaign from "./pages/Campaign";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/campaign" element={<Campaign />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}
