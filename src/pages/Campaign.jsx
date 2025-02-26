// CampaignPage.jsx
import React from 'react';

const CampaignPage = () => {
  // Mock data
  const campaigns = [
    {
      id: 1,
      title: 'Summer Fashion Launch',
      status: 'active',
      budget: '$5,000',
      timeline: 'Jun 15 - Jul 15',
      influencers: ['@fashionista', '@styleguide'],
      deliverables: ['3 Instagram posts', '2 Stories', '1 Reel']
    },
    // Add more mock campaigns
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Campaign Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            + Create New Campaign
          </button>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Campaigns" value="12" />
          <StatCard title="Active" value="5" color="green" />
          <StatCard title="Completed" value="7" color="blue" />
          <StatCard title="Pending" value="2" color="yellow" />
        </div>

        {/* Campaign List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Active Campaigns</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-semibold">{campaign.title}</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${statusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <span className="text-gray-500">{campaign.timeline}</span>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View Details
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Deliverables</h5>
                    <ul className="list-disc pl-5 mt-1">
                      {campaign.deliverables.map((d, i) => (
                        <li key={i} className="text-gray-700">{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Influencers</h5>
                    <div className="flex space-x-2 mt-1">
                      {campaign.influencers.map((inf, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {inf}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = 'gray' }) => (
  <div className={`bg-white p-4 rounded-lg shadow border-t-4 border-${color}-500`}>
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const statusColor = (status) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export default CampaignPage;