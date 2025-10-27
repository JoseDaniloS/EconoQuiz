import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { usePlay } from "../hooks/usePlayContext";
import QuestionCard from "../components/GameScreen/QuestionCard";
import HeaderGameScreen from "../components/GameScreen/HeaderGameScreen";
import PopUp from "../components/GameScreen/Pop-up";

import Background0 from "/0.jpg";
import Background1 from "/1.jpg";
import Background2 from "/2.jpg";
import Background3 from "/3.jpg";

export default function GameScreen() {
  const { id_partida } = useParams();
  const { loadQuestions } = usePlay(); // ✅ Nome semântico (depois da refatoração do contexto)

  const randomBackground = useMemo(() => {
    const images = [Background0, Background1, Background2, Background3];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  // Carrega as perguntas da partida
  useEffect(() => {
    if (!id_partida) return;

    const fetchQuestions = async () => {
      try {
        await loadQuestions(id_partida);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    };

    fetchQuestions();
  }, [id_partida, loadQuestions]);

  return (
    <motion.div
      className="flex flex-col items-center py-6 max-md:py-1 h-screen bg-cover bg-center justify-center w-full text-white relative"
      style={{ backgroundImage: `url(${randomBackground})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay escura */}
      <div className="absolute inset-0 h-screen bg-black/50" />

      <HeaderGameScreen />

      <main className="w-full relative h-full p-5 mt-auto flex flex-col items-center justify-between">
        <QuestionCard />
        <PopUp />
      </main>
    </motion.div>
  );
}
