import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFromStorage } from "@/utils/LocalStorage";

export default function InfluencerRequests() {
  const [requests, setRequests] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState({});
  const [loading, setLoading] = useState(true);
  const user = getUserFromStorage();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(`/business/pending-requests/${user.id}`);
        setRequests(data.data);
        groupRequestsByCampaign(data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchRequests();
    }
  }, [user?.id]);

  const groupRequestsByCampaign = (requests) => {
    const grouped = {};
    requests.forEach(request => {
      if (!grouped[request.campaignId._id]) {
        grouped[request.campaignId._id] = {
          campaign: request.campaignId,
          requests: []
        };
      }
      grouped[request.campaignId._id].requests.push(request);
    });
    setGroupedRequests(grouped);
  };

  const handleRequest = async (participationId, action) => {
    try {
      await axios.post('/business/handle-request', {
        participationId,
        action 
      });
      
      // Update local state
      setRequests(prev => prev.filter(req => req._id !== participationId));
      setGroupedRequests(prev => {
        const newGrouped = {...prev};
        Object.keys(newGrouped).forEach(campaignId => {
          newGrouped[campaignId].requests = newGrouped[campaignId].requests
            .filter(req => req._id !== participationId);
          if (newGrouped[campaignId].requests.length === 0) {
            delete newGrouped[campaignId];
          }
        });
        return newGrouped;
      });
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading requests...</div>;
  }

  if (Object.keys(groupedRequests).length === 0) {
    return <p className="text-gray-500 py-4">No pending influencer requests</p>;
  }

  return (
    <div className="space-y-6">
      {Object.values(groupedRequests).map(({ campaign, requests }) => (
        <div key={campaign._id} className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
            <p className="text-sm text-gray-600">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {requests.map(request => (
              <div key={request._id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {request.influencer.image ? (
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={request.influencer.image} 
                            alt={request.influencer.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">
                              {request.influencer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {request.influencer.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Requested: {new Date(request.requestedAt).toLocaleString()}
                        </p>
                        {request.message && (
                          <p className="mt-1 text-sm text-gray-700">
                            Message: "{request.message}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRequest(request._id, 'approve')}
                      className="rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRequest(request._id, 'reject')}
                      className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}