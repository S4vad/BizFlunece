import { Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ProfileHeader({
  profile,
  isEditing,
  onEdit,
  onSave,
  onInputChange,
}) {
  const [image, setImage] = useState(profile.image);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `profile/upload/${profile.userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        setImage(response.data.imageUrl);
        onInputChange("image", response.data.imageUrl); //update image in profile state
        toast.success("profile image update succesfully");
        console.log("Server response:", response.data);
      }
    } catch (error) {
      console.log("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="items-center space-y-8 sm:flex sm:space-x-6">
        <div className="relative">
          {isEditing ? (
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
              <img
                src={profile.image}
                alt="profile"
                className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover hover:opacity-80"
              />
              {loading && <p className="text-sm text-gray-500">Uploading...</p>}
            </label>
          ) : (
            <img
              src={profile.image}
              alt="profile"
              className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover hover:opacity-80"
            />
          )}
        </div>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-2xl font-bold"
            />
          ) : (
            <h2 className="text-2xl font-bold">{profile.name}</h2>
          )}
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => onInputChange("bio", e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 p-2"
            />
          ) : (
            <p className="text-gray-500 sm:w-2/3">{profile.bio}</p>
          )}

          <div className="mt-2 flex items-center space-x-2">
            <Star className="h-5 w-5 fill-yellow-600" />
            <span className="font-semibold text-gray-700">4.8 Rating</span>
          </div>
        </div>

        <button
          className={`${isEditing ? "text-green-700" : "text-blue-700"} flex items-center gap-1 absolute top-1 right-1`}
          onClick={isEditing ? onSave : onEdit}
        >
          {isEditing ? (
            <Save className="stroke-green-700" size={16} />
          ) : (
            <Edit className="stroke-blue-700" size={16} />
          )}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
