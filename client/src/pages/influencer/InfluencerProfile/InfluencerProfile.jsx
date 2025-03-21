import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Twitter, Globe } from "lucide-react";
import { getUserFromStorage } from "@/utils/LocalStorage";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStatus from "./components/ProfileStatus";
import axios from "axios";
import { toast } from "sonner";
import PortfolioItem from "./components/PortfolioItem";
import AddPlatformModal from "./components/AddPlatformModal";
import { Plus } from "lucide-react";

export default function InfluencerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Your Name",
    followers: "---",
    engagementRate: "N/A",
    location: "-----",
    platforms: [],
    portfolio: [],
    image: "/default-profile.jpg",
    aboutMe: "Add your brief introduction here...",
    bio: "Add your bio here",
  });

  const user = getUserFromStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profile/${user.id}`);
        if (!isEditing) {
          setProfile((prev) => ({
            ...prev,
            ...response.data,
            portfolio: response.data.portfolio || [], // Ensure portfolio is always an array
          }));
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddPlatform = (newPlatform) => {
    setProfile((prev) => {
      const updatedPortfolio = [...prev.portfolio, newPlatform];
      return { ...prev, portfolio: updatedPortfolio };
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/profile/${user.id}`, profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="rounded-2xl bg-white p-6 shadow-lg">
        <Card className="p-6">
          <ProfileHeader
            profile={profile}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onInputChange={handleInputChange}
          />
          <ProfileStatus
            profile={profile}
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </Card>
        <div className="mx-auto mt-8 max-w-4xl">
          <p>Add Your Active Platform here</p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {profile.portfolio.length > 0 ? (
              profile.portfolio.map((platform, index) => (
                <PortfolioItem
                  key={`${platform.platform}-${index}`}
                  platform={platform}
                />
              ))
            ) : (
              <p className="text-gray-500">No platforms added yet.</p>
            )}
          </div>

          {/* Add Platform Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal
            className="mt-4 flex items-center justify-center rounded-full bg-gray-200 p-2 text-white hover:bg-blue-300"
          >
            <Plus size={20} /> {/* Plus icon */}
          </button>
        </div>

        {/* Add Platform Modal */}
        <AddPlatformModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddPlatform={handleAddPlatform}
        />

        <h3 className="mt-6 text-xl font-semibold">About Me</h3>
        {isEditing ? (
          <textarea
            value={profile.aboutMe}
            onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2"
          />
        ) : (
          <p className="mt-2 text-gray-600">{profile.aboutMe}</p>
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
