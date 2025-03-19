import InfluencerCard from "./components/InfluencerCard";

export default function InfluencerList() {
  const influencers = [
    {
      name: "John Doe",
      followers: "120K",
      engagement: "4.8%",
      niche: "Fashion",
    },
    {
      name: "Sarah Smith",
      followers: "85K",
      engagement: "6.2%",
      niche: "Tech",
    },
    { name: "Savad", followers: "2.5M", engagement: "48%", niche: "Tech" },
    { name: "Sunoos", followers: "5.5M", engagement: "48%", niche: "Gamer" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3">
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            New Campaign
          </button>
        </div>
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Find Influencers</h2>
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Search by niche or name..."
              className="flex-1 rounded-lg border bg-white px-4 py-2"
            />
            <select className="rounded-lg border bg-white px-4 py-2">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {influencers.map((influencer, index) => (
              <InfluencerCard
                key={index}
                influencer={influencer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
