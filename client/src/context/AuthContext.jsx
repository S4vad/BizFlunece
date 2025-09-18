import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/auth/verify", {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);

        // Auto-redirect logic  conditions
        const currentPath = location.pathname;
        const publicPaths = ["/", "/login", "/signup", "/forgot-password"];
        const isPublicPath = publicPaths.some((path) =>
          currentPath.startsWith(path),
        );

        if (isPublicPath) {
          navigateBasedOnRole(response.data.user.role);
        }
      }
    } catch (error) {
      console.log(
        "Authentication check failed:",
        error.response?.data?.message || "No valid token",
      );
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    navigateBasedOnRole(userData.role);
  };

  const logout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    }
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "influencer":
        navigate("/influencer/dashboard", { replace: true });
        break;
      case "business":
        navigate("/business/dashboard", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
