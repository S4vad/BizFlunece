import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [tokenValid, setTokenValid] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  // Get token from URL parameters
  useEffect(() => {
    const urlToken = window.location.pathname.split("/").pop();
    if (urlToken) {
      setToken(urlToken);
      verifyToken(urlToken);
    }
  }, []);

  const verifyToken = async (tokenToVerify) => {
    try {
      const { data } = await axios.get(`/verify-reset-token/${tokenToVerify}`);
      if (data.success) {
        setTokenValid(true);
      }
    } catch (error) {
      console.error("Token verification error:", error);
      setTokenValid(false);
    }
  };

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const validatePasswords = () => {
    const newErrors = {};

    if (passwords.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post("/reset-password", {
        token,
        newPassword: passwords.newPassword,
      });
      if (data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({ general: error.response?.data?.error });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login")
    
  };

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 text-sm sm:text-base">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-xl sm:text-2xl">❌</span>
            </div>
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
              Invalid Link
            </h2>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              This password reset link is invalid or has expired.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => (window.location.href = "/forgot-password")}
              className="w-full rounded-lg bg-indigo-600 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:bg-indigo-700"
            >
              Request New Reset Link
            </button>

            <button
              onClick={navigateToLogin}
              className="w-full rounded-lg border border-gray-300 py-2 sm:py-2.5 text-gray-700 text-sm sm:text-base hover:bg-gray-50"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-xl sm:text-2xl">✅</span>
            </div>
            <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">Success!</h2>
            <p className="text-gray-600 text-sm sm:text-base px-2">
              Your password has been reset successfully.
            </p>
          </div>

          <button
            onClick={navigateToLogin}
            className="w-full rounded-lg bg-indigo-600 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:bg-indigo-700"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-white p-6 sm:p-8 shadow-sm">
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">Enter your new password below.</p>
        </div>

        <div onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="mb-1 sm:mb-2 block text-gray-700 text-sm sm:text-base">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full rounded-lg border bg-white px-3 sm:px-4 py-2 text-sm sm:text-base focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="mb-1 sm:mb-2 block text-gray-700 text-sm sm:text-base">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
              className="w-full rounded-lg border bg-white px-3 sm:px-4 py-2 text-sm sm:text-base focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.general && (
            <p className="text-center text-xs sm:text-sm text-red-600">{errors.general}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={
              isLoading || !passwords.newPassword || !passwords.confirmPassword
            }
            className="w-full rounded-lg bg-indigo-600 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={navigateToLogin}
              className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}