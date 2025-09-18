import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import CountUp from "react-countup";
import Influencers from "../components/Influencers";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import { useState } from "react";
import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/darkmode/ModeToggle";
import { useAuth } from "@/context/AuthContext";
import Feature from "@/components/Feature";

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hoverButton, setHoverButton] = useState("signup");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-background">
      {/* Navbar */}
      <nav className="bg-white shadow-sm dark:bg-dark-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-3xl font-bold text-indigo-600">BizFluenze</div>

          <div className="flex items-center space-x-4">
            {!user && (
              <div>
                <button
                  onClick={() => navigate("/login")}
                  onMouseEnter={() => setHoverButton("login")}
                  onMouseLeave={() => setHoverButton("signup")}
                  className={`rounded-lg px-4 py-2 transition duration-300 ${
                    hoverButton === "login"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600"
                      : "text-gray-600 hover:text-indigo-600 dark:bg-gray-500 dark:text-white"
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
                      : "text-gray-600 hover:text-indigo-600 dark:bg-gray-500 dark:text-white"
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
      <div className="flex min-h-[calc(100vh-64px)] flex-col-reverse md:flex-row">
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:ml-6 sm:px-6 md:ml-10 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-16">
          <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl">
              Connect with the right{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                Influencers
              </span>
            </h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-black dark:text-white sm:text-xl md:mb-8 md:text-2xl lg:mb-10 lg:max-w-2xl lg:text-2xl">
              Where brands meet their perfect influencers
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:space-x-2 sm:space-y-0">
              <button
                onClick={() => navigate("/login")}
                className="transform-transition w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow duration-500 hover:scale-105 hover:bg-gray-100 sm:w-auto sm:px-8 sm:text-base"
              >
                Im a Business
              </button>
              <button
                onClick={() => navigate("/login")}
                className="transform-transition w-full rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white duration-500 hover:scale-105 hover:bg-indigo-400 sm:w-auto sm:px-8 sm:text-base"
              >
                Im an Influencer
              </button>
            </div>
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Live Platform
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Trusted by{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  500+
                </span>{" "}
                brands
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Hero />
        </div>
      </div>
      <FeatureCard />

      <Section />

      <div className="mt-36 text-center font-[certia,sans-serif] text-5xl font-medium text-black dark:text-white">
        <CountUp
          className="font-semibold text-blue-600"
          start={1}
          end={90}
          duration={7}
          separator=","
          enableScrollSpy
          scrollSpyOnce
        />
        <span className="font-semibold text-blue-600">K+</span> Influencers
        Across India
      </div>

      <Influencers />

      {/* Features Section */}
      <Feature />

      <Footer />
    </div>
  );
}
