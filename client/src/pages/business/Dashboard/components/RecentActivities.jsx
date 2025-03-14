export default function RecentActivities() {
  const recentActivities = [
    { id: 1, action: "Campaign approved", time: "2 hours ago" },
    { id: 2, action: "Payment processed", time: "1 day ago" },
    { id: 3, action: "New influencer onboarded", time: "3 days ago" },
  ];
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div
          key={activity.id}
          className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
        >
          <p className="text-gray-900">{activity.action}</p>
          <p className="text-sm text-gray-500">{activity.time}</p>
        </div>
      ))}
    </div>
  );
}
