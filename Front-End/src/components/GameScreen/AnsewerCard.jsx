import { motion } from "framer-motion";
import { GiCardRandom } from "react-icons/gi";
import useSound from "use-sound";
import clickSound from "/sounds/ClickAnswerSound.mp3";
import { usePlay } from "../../hooks/usePlayContext";
import { useParams } from "react-router-dom";
export default function AnswerCardGameScreen({
  answer = {
    color: "#808080",
    icon: <GiCardRandom />,
    text: "OPÇÃO",
  },
}) {
  const [play] = useSound(clickSound, { volume: 0.5 });
  const { verifyAnswer } = usePlay();
  const { id_partida } = useParams();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ translateY: -5 }}
      onClick={() => {
        play(), verifyAnswer(answer.text, id_partida);
      }}
      className="flex overflow-hidden w-full h-full items-center group md:justify-center gap-4 px-5 text-white font-bold py-6 rounded-xl text-xl shadow-lg"
      style={{ backgroundColor: answer.color }}
    >
      <div className="group-hover:-translate-y-2 group-hover:rotate-180 transition-transform duration-500">
        {answer.icon}
      </div>
      <p className="text-start max-md:text-sm">{answer.text}</p>
    </motion.button>
  );
}
