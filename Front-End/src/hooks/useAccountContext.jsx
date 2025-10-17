import { createContext, useContext, useState, useEffect } from "react";

const AccountContext = createContext();

// 🔐 Provider que vai envolver toda a aplicação
export function AccountProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Salva o token no localStorage sempre que mudar
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Função para login
  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
  };

  // Função para logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AccountContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

// 🔄 Hook para acessar o contexto
export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error(
      "useAccountContext deve ser usado dentro de um AccountProvider"
    );
  }
  return context;
}
