import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "@/context/AuthContext";


export default function protectedRoute({ role }) {
  const {user} = UseAuth();
  if (!user) return <Navigate to ="/login" />;
  if (user&& user.role!==role) return <Navigate to='/'/>

  return <Outlet />;
}
