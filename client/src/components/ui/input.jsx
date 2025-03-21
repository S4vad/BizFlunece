export function Input({ placeholder, value, onChange, type = "text", className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${className}`}
    />
  );
}
