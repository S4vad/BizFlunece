import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Instagram, Youtube, Twitter, Globe } from "lucide-react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileStatus from "./components/ProfileStatus";
import axios from "axios";
import { toast } from "react-hot-toast";
import PlatformItem from "./components/PlatformItem";
import AddPlatformModal from "./components/AddPlatformModal";
import { Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function InfluencerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Your Name",
    followers: "---",
    engagementRate: "N/A",
    location: "-----",
    platform: [],
    image: "/image.png",
    aboutMe: "Add your brief introduction here...",
    bio: "Add your bio here",
    influencerCategory: [],
  });

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profile/${user.id}`);
        console.log("the response infleuncer profile i s", data);
        if (!isEditing) {
          setProfile((prev) => ({
            ...prev,
            ...data.data,
            platform: data.data.platform || [],
          }));
        }
        setIsEditing(false);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user?.id]); // Only depend on user.id

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPlatform = async (newPlatform) => {
    try {
      const updatedProfile = await axios.put(`/profile/${user.id}`, {
        ...profile,
        platform: [...(profile.platform || []), newPlatform],
      });

      setProfile(updatedProfile.data);
      toast.success("Platform added successfully");
    } catch (error) {
      console.error("Error adding platform:", error);
      toast.error("Failed to add platform");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/profile/${user.id}`, profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error); // Debugging
      toast.error("Error updating profile");
    }
  };

  const handlePlatform = async (platformId) => {
    try {
      setProfile((prev) => ({
        ...prev,
        platform: prev.platform.filter((p) => p._id !== platformId),
      }));

      // update backend
      await axios.put(`/profile/${user.id}`, {
        ...profile,
        platform: profile.platform.filter((p) => p._id !== platformId),
      });

      toast.success("Platform removed successfully");
    } catch (error) {
      console.error("Error removing platform:", error);
      toast.error("Failed to remove platform");
    }
  };

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
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="mb-6 ml-2 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Platforms</h1>
            {/* Add Platform Button */}
            <button
              onClick={() => setIsModalOpen(true)} // Open the modal
              className="mt-4 flex items-center justify-center rounded-full bg-gray-200 p-1 text-white hover:bg-blue-300"
            >
              <Plus size={20} /> {/* Plus icon */}
            </button>
          </div>

          {profile.platform.length === 0 && (
            <p className="text-lg text-gray-600">
              Add Your Active Platform here
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {profile.platform.length > 0 ? (
              profile.platform.map((platform, index) => (
                <PlatformItem
                  key={`${platform.platform}-${index}`}
                  platform={platform}
                  isEditing={isEditing}
                  handlePlatform={handlePlatform}
                />
              ))
            ) : (
              <p className="text-gray-500">No platforms added yet.</p>
            )}
          </div>
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
      </Card>
    </div>
  );
}
