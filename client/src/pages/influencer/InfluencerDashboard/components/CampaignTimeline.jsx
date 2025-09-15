
import { Bell, Clock, CheckCircle, XCircle, AlertCircle, Megaphone } from 'lucide-react';

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

// Campaign Timeline Component
export default function CampaignTimeline({ campaigns }) {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-3 h-3 text-red-500" />;
      default:
        return <AlertCircle className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        <Megaphone className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">No campaigns yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {campaigns.map((campaign) => (
        <div 
          key={campaign._id} 
          className="group bg-white border border-gray-200 rounded-lg p-2.5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            {/* Campaign Icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-blue-600" />
            </div>

            {/* Company Image */}
            <img
              src={campaign.campaignId.companyImage}
              alt={campaign.campaignId.companyName}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-200"
            />

            {/* Campaign Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 text-sm truncate">
                  {campaign.campaignId.title}
                </h3>
                <span className="text-xs text-gray-400 ml-2">
                  {formatTimeAgo(campaign.requestedAt)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{campaign.campaignId.companyName}</span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium border ${getStatusColor(campaign.adminResponse.status)}`}>
                    {getStatusIcon(campaign.adminResponse.status)}
                    {campaign.adminResponse.status}
                  </span>
                </div>
                
                {/* Status Badge - keeping your purple theme */}
                <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                  Campaign
                </span>
              </div>
            </div>
          </div>

          {/* Request Type Indicator */}
          <div className="mt-2 pl-11 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Bell className="w-3 h-3" />
              {campaign.requestedStatus === 'requested' ? 'Campaign Request' : 
               campaign.requestedStatus === 'approved' ? 'Campaign Approved' : 
               'Campaign Update'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}