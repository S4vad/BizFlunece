import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import CountUp from "react-countup";
import Influencers from "../components/Influencers";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>
          <div className="text-md hidden gap-x-12 font-medium text-gray-700 md:flex">
            <div
              onClick={() => navigate("/Dashboard")}
              className="cursor-pointer transition duration-300 hover:text-indigo-600"
            >
              Dashboard
            </div>
            <div className="cursor-pointer transition duration-300 hover:text-indigo-600">
              About Us
            </div>
            <div className="cursor-pointer transition duration-300 hover:text-indigo-600">
              Our Works
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-indigo-600">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-[calc(100vh-64px)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-left">
          <h1 className="mb-6 text-5xl font-bold">
            Connect with Perfect Influencers
          </h1>
          <p className="mb-8 text-2xl">
            AI-powered platform for seamless brand-influencer collaborations
          </p>
          <div className="space-x-4">
            <button className="transform-transition rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 duration-500 hover:scale-105 hover:bg-gray-100">
              Im a Business
            </button>
            <button className="transform-transition rounded-lg bg-indigo-500 px-8 py-3 font-semibold text-white duration-500 hover:scale-105 hover:bg-indigo-400">
              Im an Influencer
            </button>
          </div>
        </div>
      </div>
      <FeatureCard />

      <Section />

      <div className="mt-36 text-center  font-[certia,sans-serif] text-5xl font-medium text-black">
        <CountUp start={1} end={500} duration={4} separator="," />
        K+ Influencers Across India
      </div>

      <Influencers />

      {/* Features Section */}
      <div className="mx-auto mt-36 max-w-7xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {["AI Matching", "Real Analytics", "Secure Payments"].map(
            (feature) => (
              <div key={feature} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <span className="text-xl text-indigo-600">★</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
