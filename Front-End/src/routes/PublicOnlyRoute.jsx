import { Navigate, Outlet } from "react-router-dom";
import { useAccountContext } from "../hooks/useAccountContext";

export function PublicOnlyRoute() {
  const { token } = useAccountContext();

  if (token) {
    return <Navigate to="/play" replace />;
  }

  return <Outlet />;
}
