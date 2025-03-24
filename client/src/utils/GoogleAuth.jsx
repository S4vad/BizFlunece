import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function GoogleLoginButton({ isBusiness }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const payload = {
        token: credentialResponse.credential,
        user: { isBusiness },
      };

      const { data } = await axios.post(
        "http://localhost:5000/googleAuth",
        payload,
        { withCredentials: true },
      );

      toast.success("Signup successful!", {
        style: { backgroundColor: "green", color: "white" },
        duration: 2000,
      });

      setTimeout(() => {
        login(data.user);
        navigate(`/${data.user.role}/dashboard`);
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Failed to submit form. Try again later.",
        {
          style: { backgroundColor: "red", color: "white" },
        },
      );
    }
  };

  const handleError = () => {
    toast.error("Google login failed!", {
      style: { backgroundColor: "red", color: "white" },
    });
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
