import Select from "react-select";

export default function ProfileStatus({
  user,
  profile,
  isEditing = false, 
  onInputChange = null,
}) {
  const categoryOptions = [
    { value: "Fashion", label: "Fashion" },
    { value: "Beauty", label: "Beauty" },
    { value: "Fitness", label: "Fitness" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Food", label: "Food" },
    { value: "Travel", label: "Travel" },
    { value: "Technology", label: "Technology" },
    { value: "Gaming", label: "Gaming" },
    { value: "Health", label: "Health" },
    { value: "Music", label: "Music" },
    { value: "Parenting", label: "Parenting" },
    { value: "Art", label: "Art" },
    { value: "Education", label: "Education" },
    { value: "Entertainment", label: "Entertainment" },
  ];
  // Ensure influencerCategory is always an array
  const influencerCategory = Array.isArray(profile.influencerCategory)
    ? profile.influencerCategory
    : [profile.influencerCategory].filter(Boolean);

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
          <p className="text-sm font-semibold text-gray-900">
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
      <div>
        <p className="text-sm text-gray-500">Influencer Category</p>
        {isEditing ? (
          <Select
            isMulti
            options={categoryOptions}
            value={categoryOptions.filter((opt) =>
              influencerCategory.includes(opt.value),
            )}
            onChange={(selectedOptions) =>
              onInputChange(
                "influencerCategory",
                selectedOptions.map((opt) => opt.value),
              )
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        ) : (
          <p className="text-sm font-semibold text-gray-900">
            {influencerCategory.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
