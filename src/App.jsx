import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupLogin';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout'; 
import UserLogin from './pages/UserLogin';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<UserLogin />} />

      </Routes>
    </Layout>
  );
}
