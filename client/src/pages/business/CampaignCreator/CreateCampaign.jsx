import axios from "axios";
import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import Select from "react-select";

export default function CreateCampaign() {
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    budget: "",
    targetAudience: "",
    duration: "",
    platforms: [],
    deliverables: "",
    location: "",
    companyName: "",
    videoDuration: "",
    videoAd: null,
    category: [],
    deadline: "", // <-- added deadline
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    let updatedPlatforms = [...campaignData.platforms];
    if (checked) {
      updatedPlatforms.push(value);
    } else {
      updatedPlatforms = updatedPlatforms.filter(
        (platform) => platform !== value
      );
    }
    setCampaignData({ ...campaignData, platforms: updatedPlatforms });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setCampaignData({ ...campaignData, videoAd: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("businessId", user.id);
    formData.append("title", campaignData.title);
    formData.append("description", campaignData.description);
    formData.append("budget", campaignData.budget);
    formData.append("targetAudience", campaignData.targetAudience);
    formData.append("duration", campaignData.duration);
    formData.append("deliverables", campaignData.deliverables);
    formData.append("companyName", campaignData.companyName);
    formData.append("videoDuration", campaignData.videoDuration);
    formData.append("location", campaignData.location);
    formData.append("platforms", JSON.stringify(campaignData.platforms));
    formData.append("category", JSON.stringify(campaignData.category)); // <-- added
    formData.append("deadline", campaignData.deadline); // <-- added

    if (campaignData.videoAd) {
      formData.append("videoAd", campaignData.videoAd);
    }

    try {
      await toast.promise(
        axios.post("/business/createcampaign", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Creating campaign...",
          success: "Campaign created successfully!",
          error: "Failed to create campaign.",
        }
      );
    } catch (error) {
      console.log("Error creating campaign", error);
      toast.error("Failed to create campaign.");
    }

    setCampaignData({
      title: "",
      description: "",
      budget: "",
      targetAudience: "",
      duration: "",
      platforms: [],
      deliverables: "",
      location: "",
      companyName: "",
      videoDuration: "",
      videoAd: null,
      category: [],
      deadline: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-gray-50 p-10">
      <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create a New Campaign</h2>
          <button
            type="submit"
            form="campaignForm"
            className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Create Campaign
          </button>
        </div>

        <form
          id="campaignForm"
          onSubmit={handleSubmit}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-700">Campaign Title</label>
              <input
                type="text"
                name="title"
                value={campaignData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter campaign title"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={campaignData.companyName}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={campaignData.location}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter campaign location"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-gray-700">Category</label>
              <Select
                isMulti
                options={categoryOptions}
                value={categoryOptions.filter((opt) =>
                  campaignData.category.includes(opt.value)
                )}
                onChange={(selectedOptions) =>
                  setCampaignData({
                    ...campaignData,
                    category: selectedOptions.map((opt) => opt.value),
                  })
                }
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-2 block text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={campaignData.deadline}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-gray-700">Description</label>
              <textarea
                name="description"
                value={campaignData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your campaign"
                rows="4"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 block text-gray-700">Budget</label>
              <input
                type="number"
                name="budget"
                value={campaignData.budget}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter budget"
                required
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="mb-2 block text-gray-700">Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                value={campaignData.targetAudience}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter target audience"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Duration */}
            <div>
              <label className="mb-2 block text-gray-700">
                Campaign Duration (in days)
              </label>
              <input
                type="number"
                name="duration"
                value={campaignData.duration}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter duration"
                required
              />
            </div>

            {/* Video Duration */}
            <div>
              <label className="mb-2 block text-gray-700">
                Video Duration (Minutes)
              </label>
              <input
                type="number"
                name="videoDuration"
                value={campaignData.videoDuration}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter video duration"
                required
              />
            </div>

            {/* Preferred Platforms */}
            <div>
              <label className="mb-2 block text-gray-700">
                Preferred Platforms
              </label>
              <div className="space-y-2">
                {["Instagram", "TikTok", "YouTube", "Facebook", "Twitter"].map(
                  (platform) => (
                    <label key={platform} className="flex items-center">
                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform}
                        checked={campaignData.platforms.includes(platform)}
                        onChange={handlePlatformChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {platform}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="mb-2 block text-gray-700">Deliverables</label>
              <textarea
                name="deliverables"
                value={campaignData.deliverables}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe deliverables"
                rows="4"
                required
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="mb-2 block text-gray-700">
                Upload Short Video Ad
              </label>
              <input
                type="file"
                name="videoAd"
                ref={fileInputRef}
                onChange={handleVideoUpload}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                accept="video/*"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
