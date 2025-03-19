import InfluencerCard from "../InfluencerList/components/InfluencerCard";

export default function Favorite() {
  const influencers = [
    {
      name: "John Doe",
      followers: "120K",
      engagement: "4.8%",
      niche: "Fashion",
    },
    {
      name: "John Doe",
      followers: "120K",
      engagement: "4.8%",
      niche: "Fashion",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" w-full max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        <div className="flex flex-col space-y-4">
          {influencers.map((item, index) => (
            <InfluencerCard key={index} influencer={item} />
          ))}

          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
