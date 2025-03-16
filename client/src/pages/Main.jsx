import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import CountUp from "react-countup";
import Influencers from "../components/Influencers";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import { useState } from "react";
import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/darkmode/ModeToggle";
import { getUserFromStorage } from "@/utils/LocalStorage";

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoverButton, setHoverButton] = useState("signup");
  const user = getUserFromStorage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night">
      {/* Navbar */}
      <nav className="bg-white shadow-sm dark:bg-night-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>
          <div className="text-md hidden gap-x-12 font-medium text-gray-700 md:flex">
            <div className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500">
              About Us
            </div>
            <div className="cursor-pointer transition duration-300 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-500">
              Our Works
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!user && (
              <div>
                <button
                  onMouseEnter={() => setHoverButton("login")}
                  onMouseLeave={() => setHoverButton("signup")}
                  className={`rounded-lg px-4 py-2 transition duration-300 ${
                    hoverButton === "login"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  onMouseEnter={() => setHoverButton("signup")}
                  onMouseLeave={() => setHoverButton("signup")}
                  className={`rounded-lg px-4 py-2 transition duration-300 ${
                    hoverButton === "signup"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="ml-20 flex h-[calc(100vh-64px)] flex-col text-white md:flex-row">
        <div className="mx-auto mt-20 max-w-7xl px-4 py-10 text-left">
          <h1 className="mb-6 text-5xl font-bold text-black dark:text-white">
            Connect with Perfect Influencers
          </h1>
          <p className="mb-8 text-2xl text-black dark:text-white md:w-[40rem]">
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
        <div>
          <Hero />
        </div>
      </div>
      <FeatureCard />

      <Section />

      <div className="mt-36 text-center font-[certia,sans-serif] text-5xl font-medium text-black dark:text-white">
        <CountUp
          className="dark:text-white"
          start={1}
          end={500}
          duration={4}
          separator=","
        />
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
