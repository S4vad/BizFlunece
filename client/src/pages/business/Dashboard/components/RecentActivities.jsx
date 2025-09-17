import axios from "axios";
import { useEffect, useState } from "react";
import { MessageCircle, Users, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";

export default function RecentActivities() {
  const [recentActivities, setRecentActivities] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const businessId = user?.id;
        if (!businessId) return;

        const res = await axios.get(
          `/business/get-recent-activities/${businessId}`,
        );
        setRecentActivities(res.data.data || []);
      } catch (error) {
        console.log("Error fetching activities:", error.message);
      }
    };

    fetchRecentActivities();
  }, []);

  if (recentActivities.length === 0) {
    return <p className="py-4 text-gray-500">No recent activities</p>;
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
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
        >
          {/* Avatar with overlay icon */}
          <div className="relative flex-shrink-0">
            {activity.image ? (
              <img
                src={activity.image}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                {getIcon(activity.type)}
              </div>
            )}
            {/* Overlay icon */}
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 shadow">
              {getIcon(activity.type)}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-900">
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
              {formatDistanceToNow(new Date(activity.time), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
