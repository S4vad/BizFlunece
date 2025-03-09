import { createContext, useContext, useState } from "react";
import {
  getUserFromStorage,
  setUserToStorage,
  removeUserFromStorage,
} from "../utils/LocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage());

  const login = (userData) => {
    setUser(userData);
    setUserToStorage(userData);
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth =() =>useContext(AuthContext);
//custom hook for using AuthContext