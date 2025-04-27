import { Edit, Save } from "lucide-react";
import { Star } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import StartConversationButton from "@/pages/Message/StartConversationButton";

export default function ProfileHeader({
  user,
  profile,
  isEditing = false,
  onEdit = null,
  onSave = null,
  onInputChange = null,
  showEdit = true,
}) {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    const api = user.isBusiness ? "/business" : "";

    try {
      console.log("adding");

      const { data } = await axios.post(
        `${api}/profile/upload/${profile.userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      console.log(data);

      if (data.success) {
        onInputChange("image", data.imageUrl);
        toast.success("Profile image updated successfully");
      } else {
        toast.error("Error updating profile image");
      }
    } catch (error) {
      console.log("Error uploading image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {showEdit && (
        <button
          className={`${isEditing ? "text-green-700" : "text-blue-700"} absolute right-0 top-0 flex items-center gap-1 text-sm`}
          onClick={isEditing ? onSave : onEdit}
        >
          {isEditing ? (
            <Save className="stroke-green-700" size={14} />
          ) : (
            <Edit className="stroke-blue-700" size={14} />
          )}
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
      <div className="items-center space-y-8 sm:flex sm:space-x-6">
        <div className="relative">
          {isEditing ? (
            <div className="group relative h-32 w-32">
              <label className="block h-full w-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <img
                  src={profile.image}
                  alt="profile"
                  className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    Change Photo
                  </span>
                </div>
              </label>

              {loading && (
                <div className="mt-1 text-center text-sm text-gray-500">
                  Uploading...
                </div>
              )}
            </div>
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
            <div className="text-gray-500 sm:w-2/3">{profile.bio}</div>
          )}

          <div className="mt-2 flex items-center space-x-2">
            <Star className="h-5 w-5 fill-yellow-600" />
            <span className="font-semibold text-gray-700">4.8 Rating</span>
          </div>
        </div>

        <div className="flex md:flex-col justify-evenly md:justify-end gap-4">
          <div>
            <button className="rounded-lg bg-indigo-600 px-[26px] py-1 text-white hover:bg-indigo-500">
              Follow
            </button>
          </div>
          <div>
          {/* simple login if not editable then show messge button */}
           {!showEdit &&
            <StartConversationButton partnerUserId={profile.userId} />

           }
          </div>
        </div>
      </div>
    </div>
  );
}
