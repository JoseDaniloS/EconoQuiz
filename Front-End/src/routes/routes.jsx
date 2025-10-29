import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/Home";
import GameScreen from "../pages/GameScreen";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import SelectDifficulty from "../pages/SelectDifficulty";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/play" element={<SelectDifficulty />} />
        <Route
          path="/play/:id_partida/:difficulty"
          element={<GameScreen />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
