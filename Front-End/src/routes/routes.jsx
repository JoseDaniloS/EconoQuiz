import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/Home";
import GameScreen from "../pages/GameScreen";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/play" element={<GameScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
