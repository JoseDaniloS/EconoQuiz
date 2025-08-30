import { motion } from "framer-motion";
import { FaCircle, FaSquare } from "react-icons/fa";
import { BsTriangleFill, BsDiamondFill } from "react-icons/bs";
import AnswerCardGameScreen from "./AnsewerCard";

export default function QuestionCard() {
  const answers = [
    {
      text: "Apenas aumentar salários",
      color: "#E21B3C",
      icon: <BsTriangleFill />,
    }, // Vermelho
    {
      text: "Garantir direitos trabalhistas e condições seguras",
      color: "#1368CE",
      icon: <FaSquare />,
    }, // Azul
    {
      text: "Reduzir a jornada de trabalho",
      color: "#D89E00",
      icon: <FaCircle />,
    }, // Amarelo
    {
      text: "Eliminar todos os empregos informais",
      color: "#26890C",
      icon: <BsDiamondFill />,
    }, // Verde
  ];

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4  w-full">
      {answers.map((answer, index) => (
        <AnswerCardGameScreen key={index} answer={answer}  />
      ))}
    </div>
  );
}
