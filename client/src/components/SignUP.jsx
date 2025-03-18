import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; 
import GoogleLoginButton from "@/utils/GoogleAuth"; 

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isBusiness, setIsBusiness] = useState(true);
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
    console.log("Form data:", formData);
    try {
      const response = await axios.post(
        "/signup",
        {
          ...formData,
          isBusiness,
        },
        { withCredentials: true },
      );

      setFormData({ name: "", email: "", socialMediaHandle: "", password: "" });

      const api = isBusiness ? "business" : "influencer";

      toast.success("Signup successful!");

      setTimeout(() => {
        login(response.data.user);
        navigate(`/${api}`);
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Failed to submit form. Try again later."
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
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="mb-2 block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border px-4 py-2 focus:border bg-white focus:ring-2 focus:ring-indigo-500"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full rounded-lg border px-4 py-2 bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg border px-4 py-2 bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
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
                placeholder="Social Media Handle"
                value={formData.socialMediaHandle}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2 bg-white focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                required={!isBusiness}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
          >
            Create Account
          </button>
        </form>
        <GoogleLoginButton isBusiness={isBusiness}/>
        
      </div>
    </div>
  );
}
