import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Twitter, Globe } from "lucide-react";
import ProfileHeader from "@/pages/influencer/InfluencerProfile/components/ProfileHeader";
import ProfileStatus from "@/pages/influencer/InfluencerProfile/components/ProfileStatus";
import PlatformItem from "@/pages/influencer/InfluencerProfile/components/PlatformItem";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { getUserFromStorage } from "@/utils/LocalStorage";

export default function InfluencerDetails() {
  const [influencer, setInfluencer] = useState(null);
  const user = getUserFromStorage();
  const { id } = useParams();


  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const {data} = await axios.get(`/business/influencer/${id}`);
        setInfluencer(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch influencer:", error);
      }
    };

    fetchInfluencer();
  }, [id]);

  if (!influencer) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="rounded-2xl bg-white p-6 shadow-lg">
        <Card className="p-6">
          <ProfileHeader
            user={user}
            profile={influencer}
 
          />
          <ProfileStatus
            user={user}
            profile={influencer}
   
          />
        </Card>
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {influencer.platform.length > 0 ? (
              influencer.platform.map((platform, index) => (
                <PlatformItem
                  key={`${platform.platform}-${index}`}
                  platform={platform}
              
                />
              ))
            ) : (
              <p className="text-gray-500">No platforms added yet.</p>
            )}
          </div>
        </div>

        <h3 className="mt-6 text-xl font-semibold">About Me</h3>

        <p className="mt-2 text-gray-600">{influencer.aboutMe}</p>

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
              Let&apos;s Collaborate!
            </h3>
            <p className="mt-2 text-indigo-100">
              Interested in working together? Reach out to discuss partnership
              opportunities.
            </p>
            <button className="mt-4 animate-bounce rounded-lg bg-white px-6 py-2 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50">
              Let&apos;s connect
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
