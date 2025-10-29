import { Navigate, Outlet } from "react-router-dom";
import { useAccountContext } from "../hooks/useAccountContext";
import { useEffect, useState } from "react";
import { verifyTokenFetch } from "../api/VerifyToken";

export function ProtectedRoute() {
  const { token, logout } = useAccountContext();
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsValid(false);
        setChecking(false);
        return;
      }

      const valid = await verifyTokenFetch(token);
      if (!valid) logout();
      setIsValid(valid);
      setChecking(false);
    };

    verify();
  }, [token, logout]);

  if (checking) return null; // ou spinner para feedback visual
  if (!isValid) return <Navigate to="/login" replace />;

  return <Outlet />;
}
