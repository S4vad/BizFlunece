import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const hasNavigated = sessionStorage.getItem("hasNavigated");
    if (user && !hasNavigated) {
      navigateBasedOnRole(user.role);
      sessionStorage.setItem("hasNavigated", "true");
    }
  }, [user]); // Runs when user state changes

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("hasNavigated", "true"); // Set session flag
    setUser(userData);
    navigateBasedOnRole(userData.role);
  };

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("hasNavigated"); // Reset session flag
    // res.clearCookie("user"); 
    setUser(null);
    navigate("/login");
  };

  function navigateBasedOnRole(role) {
    if (role === "influencer") navigate("/influencer/dashboard");
    else if (role === "business") navigate("/business/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
