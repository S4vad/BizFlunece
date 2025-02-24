import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { data } from "../data";

export default function LandingPage() {
  const influencerNiche = [
    "Fashion & Lifestyle",
    "Banking & Finance",
    "Education",
    "Food & Beverages",
    "Health",
    "B2B & SaaS",
  ];
  const navigate = useNavigate();
  const [selectedNiche, setSelectedNiche] = useState(null);

  function nicheClick(niche) {
    setSelectedNiche(niche === selectedNiche ? null : niche);
  }
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
            <button className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 hover:bg-gray-100">
              Im a Business
            </button>
            <button className="rounded-lg bg-indigo-500 px-8 py-3 font-semibold text-white hover:bg-indigo-400">
              Im an Influencer
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto space-y-40 px-6 py-16">
        {data.map((item, index) => (
          <div
            className={`flex items-center justify-center gap-14 ${
              index % 2 == 0
                ? ""
                : "md:flex-row-reverse"
            }`}
            key={index}
          >
            <div className="w-1/2">
              <div className="text-3xl font-semibold text-indigo-600">
                {item.title}
              </div>
              <div className="text-md mt-10">{item.content}</div>
            </div>
            <div>
              <img
                className="size-80 rounded-3xl"
                src={`images/${item.image}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center font-sans text-4xl font-bold text-black">
        500 K+ Influencers Across India
      </div>

      <div className="flex items-center justify-center space-x-10 py-20">
        {influencerNiche.map((niche, index) => (
          <div
            onClick={() => nicheClick(niche)}
            className={`cursor-pointer rounded-full border border-indigo-600 px-4 py-4 text-lg text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white ${selectedNiche === niche ? "bg-indigo-600 text-white" : "text-indigo-600 hover:text-white"}`}
            key={index}
          >
            {niche}
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
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
    </div>
  );
}
