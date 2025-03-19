import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBusiness, setIsBusiness] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    try {
      const response = await axios.post(
        "/login",
        { ...formData },
        { withCredentials: true },
      );

      setFormData({ email: "", password: "" });
      const api = isBusiness ? "business" : "influencer";

      toast.success(<span className="text-green-400">Login Successful</span>, {
        description: <span className="text-green-400">Welcome back! 🎉</span>,
        duration: 5000,
        icon: "✅",
        action: {
          label: "cancel",
          onClick: () => console.log("Toast dismissed"),
        },
      });

      await login(response.data.user);

      setTimeout(() => {
        navigate(`/${api}`);
      }, 1000);
    } catch (error) {
      toast.error(
        <span className="font-bold text-red-700">Login Failed</span>,
        {
          description: (
            <span className="text-red-700">
              {error.response?.data?.error ||
                "Failed to submit form. Try again later."}
            </span>
          ),
          duration: 5000,

          icon: "❌",
          action: {
            label: "cancel",
            onClick: () => console.log("Toast dismissed"),
          },
        },
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <div className="mb-8 flex">
          <button
            onClick={() => setIsBusiness(true)}
            className={`flex-1 py-2 text-center ${
              isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setIsBusiness(false)}
            className={`flex-1 py-2 text-center ${
              !isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Influencer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
