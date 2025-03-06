

export default function StatCard({ title, value, change }) {
  return (
    <div className="flex w-full flex-col justify-between rounded-xl bg-white p-5 shadow-md transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
      <h3 className="text-sm font-semibold text-gray-600"> {title}</h3>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p
            className={`mt-1 text-sm ${change.startsWith("-") ? "text-red-500" : "text-green-500"}`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
