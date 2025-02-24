import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const influencers = [
    { name: 'John Doe', followers: '120K', engagement: '4.8%', niche: 'Fashion' },
    { name: 'Sarah Smith', followers: '85K', engagement: '6.2%', niche: 'Tech' },
    { name: 'Savad', followers: '2.5M', engagement: '48%', niche: 'Tech' },
    { name: 'Sunoos', followers: '5.5M', engagement: '48%', niche: 'Gamer' },


  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div onClick={() =>navigate('/')} className="text-xl font-bold text-indigo-600">Dashboard</div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            New Campaign
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">Find Influencers</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by niche or name..."
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <select className="px-4 py-2 border rounded-lg">
              <option>All Platforms</option>
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {influencers.map((influencer, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">JD</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{influencer.name}</h3>
                    <p className="text-gray-600">{influencer.niche}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Followers</p>
                    <p className="font-semibold">{influencer.followers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Engagement</p>
                    <p className="font-semibold">{influencer.engagement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}