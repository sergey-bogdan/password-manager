import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function Auth() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}