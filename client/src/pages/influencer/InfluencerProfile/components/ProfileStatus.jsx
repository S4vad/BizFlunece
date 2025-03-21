export default function ProfileStatus({ profile, isEditing, onInputChange }) {
  return (
    <div className="ml-4 mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div>
        <p className="text-sm text-gray-500">Followers</p>
        <p className="text-lg font-semibold text-gray-900">
          {profile.followers}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Engagement</p>
        <p className="text-lg font-semibold text-gray-900">
          {profile.engagementRate}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Location</p>
        {isEditing ? (
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onInputChange("location", e.target.value)}
            className="text-lg font-semibold text-gray-900 border border-gray-300 p-2 rounded-lg w-full"
          />
        ) : (
          <p className="text-lg font-semibold text-gray-900">
            {profile.location}
          </p>
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500">Platforms</p>
        {isEditing ? (
          <input
            type="text"
            value={profile.platforms.join(", ")}
            onChange={(e) =>
              onInputChange("platforms", e.target.value.split(", "))
            }
            className="text-lg font-semibold text-gray-900 border border-gray-300 p-2 rounded-lg w-full"
          />
        ) : (
          <p className="text-lg font-semibold text-gray-900">
            {profile.platforms.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}