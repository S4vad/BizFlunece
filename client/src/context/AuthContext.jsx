import { createContext, useContext, useState, useEffect } from "react";
import {
  getUserFromStrorage,
  setUserToStorag,
  removeUserFromStorage,
} from "../utils/LocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStrorage());

  const login = (userData) => {
    setUser(userData);
    setUserToStorag(userData);
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


export const UseAuth =() =>useContext(AuthContext);
//custom hook for using AuthContext