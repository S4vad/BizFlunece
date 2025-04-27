import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Twitter, Globe } from "lucide-react";
import { getUserFromStorage } from "@/utils/LocalStorage";
import ProfileHeader from "@/pages/influencer/InfluencerProfile/components/ProfileHeader";
import ProfileStatus from "@/pages/influencer/InfluencerProfile/components/ProfileStatus";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "@/components/ui/Loader";

export default function BusinessProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "Your Name",
    followers: "---",
    location: "-----",
    image: "/image.png",
    aboutCompany: "Add your brief introduction here...",
    bio: "Add your bio here",
  });

  const user = getUserFromStorage();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `/business/company_profile/${user.id}`,
        );
        if (!isEditing) {
          setProfile((prev) => ({
            ...prev,
            ...data.data,
          }));
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, []);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/business/update-profile/${user.id}`, profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="rounded-2xl bg-white p-6 shadow-lg">
        <Card className="p-6">
          <ProfileHeader
            user={user}
            profile={profile}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
          <ProfileStatus
            user={user}
            profile={profile}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </Card>

        <h3 className="mt-6 text-xl font-semibold">About Organization</h3>
        {isEditing ? (
          <textarea
            value={profile.aboutCompany}
            onChange={(e) => handleInputChange("aboutCompany", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2"
          />
        ) : (
          <div className="mt-2 text-gray-600">{profile.aboutCompany}</div>
        )}

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

        {user && user.isBusiness === false && (
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
                Let's connect
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
