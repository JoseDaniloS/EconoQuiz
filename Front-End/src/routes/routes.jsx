import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/Home";
import GameScreen from "../pages/GameScreen";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import SelectDifficulty from "../pages/SelectDifficulty";

export default function MainRoutes() {
  return (
    <Routes>
      {/* Rota pública geral */}
      <Route path="/" element={<HomePage />} />

      {/* 🔒 Rota pública restrita a quem NÃO está logado */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 🔐 Rotas protegidas (só acessíveis com token válido) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/play" element={<SelectDifficulty />} />
        <Route path="/play/:id_partida/:difficulty" element={<GameScreen />} />
      </Route>

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
