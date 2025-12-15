import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/routes.jsx";
import { AccountProvider } from "./hooks/useAccountContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlayProvider } from "./hooks/usePlayContext.jsx";
import { registerSW } from "virtual:pwa-register";

// Gerencia atualizações do service worker
const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("App pronto para uso offline.");
  },
  onNeedRefresh() {
    console.log("Nova versão disponível. Atualizando...");
    updateSW(true);
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <AccountProvider>
        <PlayProvider>
          <MainRoutes />
        </PlayProvider>
      </AccountProvider>
    </BrowserRouter>
  </StrictMode>
);
