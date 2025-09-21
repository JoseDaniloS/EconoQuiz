import { motion } from "framer-motion";
import QuestionCard from "../components/GameScreen/QuestionCard";
import HeaderGameScreen from "../components/GameScreen/HeaderGameScreen";
import PopUp from "../components/GameScreen/Pop-up";
import { GameMusic } from "../components/Audio/GameAudio/Index.js";  // ← Importação CORRETA

export default function GameScreen() {
  return (
    <motion.div
      className="flex flex-col bg-primary items-center py-6 justify-center w-full h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GameMusic />  {/* ← Componente de música adicionado aqui */}
      
      <HeaderGameScreen />
      <div className="w-full h-full p-5 mt-auto flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Qual é a meta principal do trabalho decente?
        </h2>
        <QuestionCard />
        <PopUp />
      </div>
    </motion.div>
  );
}