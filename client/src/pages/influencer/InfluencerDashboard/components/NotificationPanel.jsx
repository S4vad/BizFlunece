

export default function NotificationPanel({ Notifications }) {
  return (
    <ul >
      {Notifications.map((Notification) => (
        <li key={Notification.id} className="flex items-center py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            style={{fill:"#f59e0b" ,width:'18px',height:'18px'}}
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <div className="ml-6 flex-1">
            <p className="font-sm">{Notification.name}</p>
            <p className="text-sm text-gray-500">{Notification.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
