import {
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaLeaf,
} from "react-icons/fa";
import AnswerCardGameScreen from "./AnsewerCard";

export default function QuestionCard() {
  const answers = [
    {
      text: "Promover empregos de qualidade",
      color: "#D32F2F", // Laranja do ODS 8
      icon: <FaBriefcase />,
    },
    {
      text: "Garantir direitos e segurança no trabalho",
      color: "#1976D2", // Laranja claro complementar
      icon: <FaChartLine />,
    },
    {
      text: "Incentivar crescimento econômico sustentável",
      color: "#FBC02D", // Laranja escuro mais intenso
      icon: <FaClock />,
    },
    {
      text: "Aumentar produtividade com inovação",
      color: "#388E3C", // Tom pastel para balancear
      icon: <FaLeaf />,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4  w-full">
      {answers.map((answer, index) => (
        <AnswerCardGameScreen key={index} answer={answer} />
      ))}
    </div>
  );
}
