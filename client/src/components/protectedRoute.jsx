import { Navigate } from "react-router-dom";
import { UseAuth } from "@/context/AuthContext";


export default function protectedRoute({ children }) {
  const {user} = UseAuth();
  return user ? children:<Navigate to='/login' />;
}
