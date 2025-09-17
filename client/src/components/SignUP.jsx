import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import GoogleLoginButton from "@/utils/GoogleAuth";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBusiness, setIsBusiness] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    socialMediaHandle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/signup",
        {
          ...formData,
          isBusiness,
          role: isBusiness ? "business" : "influencer"
        },
        { withCredentials: true }
      );

      setFormData({ name: "", email: "", socialMediaHandle: "", password: "" });

      toast.success(
        <span className="text-green-400">Signup Successful!</span>,
        {
          description: <span className="text-green-400">Welcome! 🎉</span>,
          duration: 3000,
          icon: "✅",
        }
      );

      // Use the login function from context
      setTimeout(() => {
        login(response.data.user);
      }, 1000);

    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        <span className="font-bold text-red-700">Signup Failed</span>,
        {
          description: (
            <span className="text-red-700">
              {error.response?.data?.error || error.response?.data?.message ||
                "Failed to create account. Please try again."}
            </span>
          ),
          duration: 5000,
          icon: "❌",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Create Account
        </h2>
        
        <div className="mb-8 flex">
          <button
            onClick={() => setIsBusiness(true)}
            className={`flex-1 py-2 text-center transition-colors ${
              isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setIsBusiness(false)}
            className={`flex-1 py-2 text-center transition-colors ${
              !isBusiness
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Influencer
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-4 space-y-4">
          <div>
            <label className="mb-2 block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="mb-2 block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>

          {!isBusiness && (
            <div>
              <label className="mb-2 block text-gray-700">
                Social Media Handle
              </label>
              <input
                type="text"
                name="socialMediaHandle"
                placeholder="@yourusername"
                value={formData.socialMediaHandle}
                onChange={handleInputChange}
                className="w-full rounded-lg border bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                required={!isBusiness}
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          
          <div className="text-center dark:text-white">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-800 dark:text-blue-400"
            >
              Login
            </button>
          </div>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <GoogleLoginButton isBusiness={isBusiness} />
      </div>
    </div>
  );
}