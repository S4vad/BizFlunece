import axios from "axios";
import { useEffect, useState } from "react";
import { MessageCircle, Users, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivities() {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const businessId = user?.id;
        if (!businessId) return;

        const res = await axios.get(
          `/business/get-recent-activities/${businessId}`
        );
        setRecentActivities(res.data.data || []);
      } catch (error) {
        console.log("Error fetching activities:", error.message);
      }
    };

    fetchRecentActivities();
  }, []);

  if (recentActivities.length === 0) {
    return <p className="text-gray-500 py-4">No recent activities</p>;
  }

  const getIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageCircle className="text-blue-500" size={18} />;
      case "influencer":
        return <Users className="text-green-500" size={18} />;
      case "campaign":
        return <Briefcase className="text-purple-500" size={18} />;
      default:
        return <MessageCircle className="text-gray-400" size={18} />;
    }
  };

  return (
    <div className="space-y-3">
      {recentActivities.map((activity, idx) => (
        <div
          key={activity._id || idx}
          className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition bg-white"
        >
          {/* Avatar with overlay icon */}
          <div className="relative flex-shrink-0">
            {activity.image ? (
              <img
                src={activity.image}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                {getIcon(activity.type)}
              </div>
            )}
            {/* Overlay icon */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
              {getIcon(activity.type)}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <p className="text-gray-900 text-sm">
              <span className="font-medium">
                {activity.action.split(":")[1] || activity.action}
              </span>
              {activity.action.includes(":") && (
                <span className="text-gray-600">
                  {" "}
                  {activity.action.split(":")[0]}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
