import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/Home";
import GameScreen from "../pages/GameScreen";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/RegisterPage";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/play" element={<GameScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
