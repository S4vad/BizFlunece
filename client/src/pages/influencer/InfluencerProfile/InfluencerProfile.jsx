import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Instagram, Youtube, Twitter, Globe } from "lucide-react";

export default function InfluencerProfile() {
  const [following, setFollowing] = useState(false);
  const influencer = {
    followers: "125K",
    engagementRate: "8.2%",
    location: "New York, USA",
    platforms: ["Instagram", "YouTube"],
    portfolio: [
      {
        id: 1,
        platform: "Instagram",
        link: "https://instagram.com/sarahj",
        followers: "85K",
        engagement: "9.1%",
      },
      {
        id: 2,
        platform: "YouTube",
        link: "https://youtube.com/sarahj",
        subscribers: "40K",
        engagement: "14.3%",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="rounded-2xl bg-white p-6 shadow-lg">
        <Card className="p-6">
          <div className="sm:flex items-center  space-y-8 sm:space-x-6">
            <img
              src="/img/PEDRI.jpeg"
              alt="Influencer"
              className="h-28 w-32 rounded-full border-4 border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold">Alex Johnson</h2>
              <p className="text-gray-500 sm:w-2/3">
                Travel & Lifestyle Content Creator | Exploring the world one
                story at a time 🌍
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-600" />
                <span className="font-semibold text-gray-700">4.8 Rating</span>
              </div>
            </div>

            <Button
              className={`$ w-28 ${following ? "border-spacing-1 border-black bg-gray-50 text-black" : "bg-blue-600"}`}
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </Button>
          </div>

          <div className="ml-4 mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-lg font-semibold text-gray-900">
                {influencer.followers}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="text-lg font-semibold text-gray-900">
                {influencer.engagementRate}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-900">
                {influencer.location}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Platforms</p>
              <p className="text-lg font-semibold text-gray-900">
                {influencer.platforms.join(", ")}
              </p>
            </div>
          </div>
        </Card>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {influencer.portfolio.map((platform) => (
              <div
                key={platform.id}
                className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {platform.platform}
                </h3>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-indigo-600 hover:text-indigo-500"
                >
                  Visit Profile →
                </a>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">Followers/Subscribers</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {platform.followers}
                  </p>
                  <p className="text-sm text-gray-500">Engagement Rate</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {platform.engagement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-6 text-xl font-semibold">About Me</h3>
        <p className="mt-2 text-gray-600">
          Passionate traveler and lifestyle content creator, sharing unique
          experiences with an engaged audience.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Portfolio</h3>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <img
            src="https://example.com/image1.jpg"
            alt="Portfolio"
            className="rounded-lg"
          />
          <img src="/portfolio2.jpg" alt="Portfolio" className="rounded-lg" />
          <img src="/portfolio3.jpg" alt="Portfolio" className="rounded-lg" />
        </div>

        <h3 className="mt-6 text-xl font-semibold">Campaign History</h3>
        <ul className="mt-2 list-inside list-disc text-gray-600">
          <li>Brand Collaboration with XYZ Travel</li>
          <li>Sponsored Campaign for ABC Clothing</li>
          <li>Affiliate Marketing for DEF Gadgets</li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">Social Media</h3>
        <div className="mt-2 flex space-x-4">
          <a href="#" className="text-blue-500">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-red-500">
            <Youtube size={24} />
          </a>
          <a href="#" className="text-blue-400">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-700">
            <Globe size={24} />
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="rounded-xl bg-indigo-600 p-6 text-center">
            <h3 className="text-2xl font-bold text-white">
              Let's Collaborate!
            </h3>
            <p className="mt-2 text-indigo-100">
              Interested in working together? Reach out to discuss partnership
              opportunities.
            </p>
            <button className="mt-4 animate-bounce rounded-lg bg-white px-6 py-2 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50">
              Contact Me
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
