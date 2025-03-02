// ProfilePage.jsx
import React from 'react';

const ProfilePage = () => {
  // Mock influencer data
  const influencer = {
    name: 'Sarah Johnson',
    handle: '@fashionista',
    followers: '125K',
    engagement: '8.2%',
    niche: 'Fashion & Lifestyle',
    bio: 'Content creator specializing in sustainable fashion and luxury brands.',
    posts: [
      { id: 1, platform: 'Instagram', likes: '12.4K', engagement: '9.1%' },
      { id: 2, platform: 'YouTube', views: '58K', engagement: '14.3%' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-200"></div>
            <div>
              <h1 className="text-2xl font-bold">{influencer.name}</h1>
              <p className="text-gray-600">{influencer.handle}</p>
              <div className="flex space-x-4 mt-2">
                <ProfileStat title="Followers" value={influencer.followers} />
                <ProfileStat title="Engagement Rate" value={influencer.engagement} />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-gray-600">{influencer.bio}</p>
            <span className="inline-block mt-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {influencer.niche}
            </span>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Campaigns</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {influencer.posts.map(post => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{post.platform}</h3>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <div className="mt-2 space-y-1">
                  <StatItem label="Likes/Views" value={post.likes || post.views} />
                  <StatItem label="Engagement" value={post.engagement} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileStat = ({ title, value }) => (
  <div>
    <span className="text-sm text-gray-500">{title}</span>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default ProfilePage;