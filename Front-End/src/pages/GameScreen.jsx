import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { usePlay } from "../hooks/usePlayContext";
import QuestionCard from "../components/GameScreen/QuestionCard";
import HeaderGameScreen from "../components/GameScreen/HeaderGameScreen";
import { FetchMatch } from "../api/PlayFetch";
import { useAccountContext } from "../hooks/useAccountContext";
import { ModalAnswer } from "../components/GameScreen/ModalAnswer";
import confetti from "canvas-confetti";

import Background0 from "/0.jpg";
import Background1 from "/1.jpg";
import Background2 from "/2.jpg";
import Background3 from "/3.jpg";
import { EndGameScreen } from "./endMatch";

export default function GameScreen() {
  const { id_partida } = useParams();
  const {
    matchData,
    isCorrect,
    setIsCorrect,
    earnedPoints,
    quitMatch,
    isEndGame,
  } = usePlay();
  const { token } = useAccountContext();

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Escolhe um background aleatório
  const randomBackground = useMemo(() => {
    const images = [Background0, Background1, Background2, Background3];
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  // Busca os dados da partida
  useEffect(() => {
    const fetchMatchData = async () => {
      const response = await FetchMatch(id_partida, token);
      matchData(response);
    };
    fetchMatchData();
  }, []);

  // 🔹 Exibe o modal sempre que isCorrect tiver um valor (true/false)
  useEffect(() => {
    if (isCorrect === null) return;
    if (isCorrect) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#4ade80", "#22c55e", "#86efac"], // tons de verde
      });
    }
    setShowModal(true);
  }, [isCorrect]);

  if (isEndGame) {
    return <EndGameScreen />;
  }

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

      {showModal ? (
        <ModalAnswer
          isCorrect={isCorrect}
          points={earnedPoints}
          onNext={() => {
            setIsCorrect(null);
            setShowModal(false);
          }}
          onQuit={() => {
            if (
              window.confirm(
                "Você realmente deseja abandonar a partida? Seus avanços não serão salvos."
              )
            ) {
              setIsCorrect(null);
              setShowModal(false);
              quitMatch(id_partida);
              navigate("/");
            }
          }}
        />
      ) : (
        <>
          <HeaderGameScreen />
          <main className="w-full relative h-full p-5 mt-auto flex flex-col items-center justify-between">
            <QuestionCard />
          </main>
        </>
      )}
    </motion.div>
  );
}
