import { Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ProfileHeader({
  profile,
  isEditing,
  onEdit,
  onSave,
  onInputChange,
}) {
  return (
    <div>
      <div className="items-center space-y-8 sm:flex sm:space-x-6">
        <div className="relative">
          <img
            src={profile.image || "/default-profile.jpg"}
            alt="Influencer"
            className="h-28 w-28 rounded-full border-4 border-gray-200 object-cover sm:h-32 sm:w-32"
          />
          {isEditing && (
            <button
              onClick={() =>
                onInputChange("image", prompt("Enter new image URL:"))
              }
              className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              <Edit size={16} />
            </button>
          )}
        </div>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="text-2xl font-bold border border-gray-300 p-2 rounded-lg w-full"
            />
          ) : (
            <h2 className="text-2xl font-bold">{profile.name}</h2>
          )}
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => onInputChange("bio", e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-lg"
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
        className="flex items-center gap-1"
          onClick={isEditing ? onSave : onEdit}
        >
          {isEditing ? <Save size={16} /> : <Edit size={16} />}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}