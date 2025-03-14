const CampaignTimeline = ({ campaigns }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {campaigns.map((campaign) => (
        <li key={campaign.id} className="flex items-center py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            style={{ fill: "#3B82F6", width: "26px", height: "26px" }}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39c.4-.53.8-1.07 1.2-1.6c-.99-.74-2.24-1.68-3.2-2.4c-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6c-.99.74-2.24 1.68-3.2 2.4c.4.53.8 1.07 1.2 1.6c.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" />
          </svg>
          <div className="flex-1 ml-6">
            <p className="font-medium">{campaign.name}</p>
            <p className="text-sm text-gray-500">
              Status: {campaign.status} | Deadline: {campaign.deadline}
            </p>
          </div>

          <span className="rounded-2xl bg-[#9c27b0] px-3 py-1.5 text-[0.72rem] text-white">
            {campaign.platform}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CampaignTimeline;
