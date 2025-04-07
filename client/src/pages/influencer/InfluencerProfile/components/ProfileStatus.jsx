export default function ProfileStatus({
  user,
  profile,
  isEditing,
  onInputChange,
}) {
  return (
    <div className="ml-4 mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div>
        <p className="text-sm text-gray-500">Followers</p>
        <p className="text-lg font-semibold text-gray-900">
          {profile.followers}
        </p>
      </div>
      {!user.isBusiness && (
        <div>
          <p className="text-sm text-gray-500">Engagement</p>
          <p className="text-lg font-semibold text-gray-900">
            {profile.engagementRate}
          </p>
        </div>
      )}

      <div>
        <p className="text-sm text-gray-500">Location</p>
        {isEditing ? (
          <input
            type="text"
            value={profile.location}
            onChange={(e) => onInputChange("location", e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-lg font-semibold text-gray-900"
          />
        ) : (
          <p className="text-lg font-semibold text-gray-900">
            {profile.location}
          </p>
        )}
      </div>
      {!user.isBusiness && (
        <div>
          <p className="text-sm text-gray-500">Platforms</p>

          <p className="text-lg font-semibold text-gray-900">
            {profile.platform.map((p) => p.platform).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
