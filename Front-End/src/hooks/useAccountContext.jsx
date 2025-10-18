import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { verifyTokenFetch } from "../api/VerifyToken";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const checkToken = useCallback(async () => {
    if (!token) {
      clearStorage();
      return;
    }

    try {
      await verifyTokenFetch(token); // se não lançar erro → token válido
      persistSession(token, user);
    } catch (error) {
      console.error("Token inválido ou expirado:", error);
      logout();
    }
  }, [token, user]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const persistSession = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
    persistSession(tokenValue, userData);
  };

  const logout = () => {
    clearStorage();
    setToken(null);
    setUser(null);
  };

  return (
    <AccountContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useAccountContext deve ser usado dentro de um AccountProvider"
    );
  }
  return context;
}
