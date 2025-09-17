import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get("/auth/verify", { 
        withCredentials: true 
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        // Auto-redirect to dashboard if on landing page
        const currentPath = window.location.pathname;
        if (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") {
          navigateBasedOnRole(response.data.user.role);
        }
      }
    } catch (error) {
      console.log("No valid token found");
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
      navigate("/login");
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === "influencer") {
      navigate("/influencer/dashboard");
    } else if (role === "business") {
      navigate("/business/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAuthenticated,
      checkAuthStatus 
    }}>
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