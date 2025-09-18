import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginButton from "@/utils/GoogleAuth";
import { FaEye } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBusiness, setIsBusiness] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setErrors(null);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    try {
      const response = await axios.post(
        "/login",
        {
          ...formData,
          role: isBusiness ? "business" : "influencer",
          isBusiness,
        },
        { withCredentials: true },
      );

      const userData = response.data.user;
      if (userData.role !== (isBusiness ? "business" : "influencer")) {
        toast.error(
          <span className="font-bold text-red-700">Wrong Account Type</span>,
          {
            duration: 5000,
            icon: "❌",
          },
        );
        return;
      }

      setFormData({ email: "", password: "" });

      toast.success(<span className="text-green-400">Login Successful</span>, {
        description: <span className="text-green-400">Welcome back! 🎉</span>,
        duration: 3000,
        icon: "✅",
      });

      setTimeout(() => {
        login(userData);
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setErrors(error.response.data.error);
      toast.error(
        <span className="font-bold text-red-700">Login Failed</span>,
        {
          description: (
            <span className="text-red-700">
              {error.response?.data?.error ||
                error.response?.data?.message ||
                "Invalid email or password. Please try again."}
            </span>
          ),
          duration: 5000,
          icon: "❌",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-sm sm:max-w-md sm:p-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          Welcome Back
        </h2>

        <div className="mb-6 flex sm:mb-8">
          <button
            onClick={() => setIsBusiness(true)}
            className={`flex-1 px-2 py-2 text-center text-sm transition-colors sm:text-base ${
              isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setIsBusiness(false)}
            className={`flex-1 px-2 py-2 text-center text-sm transition-colors sm:text-base ${
              !isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Influencer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-4 space-y-3 sm:space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-700 sm:mb-2 sm:text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:text-base"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700 sm:mb-2 sm:text-base">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm focus:border-transparent focus:ring-2 focus:ring-indigo-500 sm:px-4 sm:text-base"
                required
                disabled={isLoading}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-2 right-3 cursor-pointer sm:bottom-3"
              >
                <FaEye className="fill-gray-500 text-sm sm:text-base" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-left text-indigo-600 hover:text-indigo-800 sm:text-right"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
          {errors && (
            <p className="mt-1 text-xs text-red-600 sm:text-sm">{errors}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 sm:py-2.5 sm:text-base"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm dark:text-white sm:text-base">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-800 dark:text-blue-400"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="relative my-3 sm:my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleLoginButton isBusiness={isBusiness} />
      </div>
    </div>
  );
}
