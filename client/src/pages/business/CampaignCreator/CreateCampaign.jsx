import { useState } from "react";

export default function CreateCampaign() {

  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    budget: "",
    targetAudience: "",
    duration: "",
    platforms: [],
    deliverables: "",
    videoAd: null,
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
        (platform) => platform !== value,
      );
    }
    setCampaignData({ ...campaignData, platforms: updatedPlatforms });
  };

  // Handler for file upload (video ad)
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setCampaignData({ ...campaignData, videoAd: file });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign Data:", campaignData);
    // Add API call here to save the campaign
    setCampaignData({
      title: "",
      description: "",
      budget: "",
      targetAudience: "",
      duration: "",
      platforms: [],
      deliverables: "",
      videoAd: null,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-sm">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create a New Campaign</h2>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600  px-6 py-2 text-white hover:bg-indigo-700"
          >
            Create Campaign
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-700">Campaign Title</label>
              <input
                type="text"
                name="title"
                value={campaignData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white  px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter campaign title"
                required
              />
            </div>

            {/* Campaign Description */}
            <div>
              <label className="mb-2 block text-gray-700">Description</label>
              <textarea
                name="description"
                value={campaignData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white  px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
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
                className="w-full rounded-lg bg-white border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter budget"
                required
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="mb-2 block text-gray-700">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                value={campaignData.targetAudience}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter target audience"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Campaign Duration */}
            <div>
              <label className="mb-2 block text-gray-700">
                Campaign Duration (in days)
              </label>
              <input
                type="number"
                name="duration"
                value={campaignData.duration}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white  px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter duration"
                required
              />
            </div>

            {/* Preferred Platforms */}
            <div>
              <label className="mb-2 block text-gray-700 ">
                Preferred Platforms
              </label>
              <div className="space-y-2  ">
                {["Instagram", "TikTok", "YouTube", "Facebook", "Twitter"].map(
                  (platform) => (
                    <label key={platform} className="flex items-center ">
                      <input
                        type="checkbox"
                        name="platforms"
                        value={platform}
                        checked={campaignData.platforms.includes(platform)}
                        onChange={handlePlatformChange}
                        className="checkbox checkbox-primary bg-gray-50 size-4  mr-2 "
                      />
                      {platform}
                    </label>
                  ),
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
                className="w-full rounded-lg border bg-white  px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe deliverables"
                rows="4"
                required
              />
            </div>

            {/* Video Ad Upload */}
            <div>
              <label className="mb-2 block text-gray-700">
                Upload Short Video Ad
              </label>
              <input
                type="file"
                name="videoAd"
                onChange={handleVideoUpload}
                className="w-full rounded-lg border bg-white  px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                accept="video/*"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
