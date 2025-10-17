import { Navigate, Outlet } from "react-router-dom";
import { useAccountContext } from "../hooks/useAccountContext";

export function ProtectedRoute() {
  const {token} = useAccountContext()

  if (!token) {
    console.log("Token Invalido!");
    return <Navigate to="/login" replace />;
  }

  console.log("Token Validado!");
  return <Outlet />;
}
