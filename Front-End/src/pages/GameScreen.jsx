import { motion } from "framer-motion";
import QuestionCard from "../components/GameScreen/QuestionCard";
import HeaderGameScreen from "../components/GameScreen/HeaderGameScreen";
import PopUp from "../components/GameScreen/Pop-up";
import Background0 from "/0.jpg"
import Background1 from "/1.jpg"
import Background2 from "/2.jpg"
import Background3 from "/3.jpg"

export default function GameScreen() {
  const randomScreenNumber = Math.floor(Math.random() * 4);

  const backgroundImages = [Background0, Background1, Background2, Background3]

  return (
    <motion.div
      className="flex flex-col items-center py-6 max-md:py-1 h-screen  bg-cover bg-center justify-center w-full text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backgroundImage: `url(${backgroundImages[randomScreenNumber]})`,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Background */}
      <div className="absolute h-screen inset-0 bg-black/50 bg-cover bg-center" />
      <HeaderGameScreen />
      <div className="w-full relative h-full p-5 mt-auto flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Qual é a meta principal do trabalho decente?
        </h2>
        <QuestionCard />
        <PopUp />
      </div>
    </motion.div>
  );
}
