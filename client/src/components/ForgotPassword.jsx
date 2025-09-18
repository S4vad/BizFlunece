import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const {data} = await axios.post("/forgot-password", { email });
      if (data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login")
    
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-xl sm:text-2xl">📧</span>
            </div>
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
              Email Sent!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              We've sent a password reset link to <strong className="break-all">{email}</strong>
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-gray-500 px-2">
              Check your inbox and click the reset link to create a new
              password. The link will expire in 1 hour.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="w-full rounded-lg border border-gray-300 py-2 sm:py-2.5 text-gray-700 text-sm sm:text-base hover:bg-gray-50"
            >
              Send Another Email
            </button>

            <button
              onClick={() => navigateToLogin()}
              className="w-full rounded-lg bg-indigo-600 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:bg-indigo-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-6 sm:p-8 shadow-sm">
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="mb-1 sm:mb-2 block text-gray-700 text-sm sm:text-base">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border bg-white px-3 sm:px-4 py-2 text-sm sm:text-base focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full rounded-lg bg-indigo-600 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigateToLogin()}
              className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}