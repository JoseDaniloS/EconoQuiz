import { memo, useEffect } from "react";
import { FaBriefcase, FaChartLine, FaClock, FaLeaf } from "react-icons/fa";
import AnswerCardGameScreen from "./AnsewerCard";
import { usePlay } from "../../hooks/usePlayContext";

function QuestionCard() {
  const { questions, questaoAtual } = usePlay();
  const question = questions?.[questaoAtual];

  if (!question) {
    return (
      <div className="text-center text-gray-200 font-semibold">
        Carregando pergunta...
      </div>
    );
  }

  const icons = [<FaBriefcase />, <FaChartLine />, <FaClock />, <FaLeaf />];
  const colors = ["#D32F2F", "#1976D2", "#FBC02D", "#388E3C"];

  const answers =
    question.options?.map((option, index) => ({
      text: option,
      color: colors[index % colors.length],
      icon: icons[index % icons.length],
    })) || [];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {question.statement}
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
        {answers.map((answer, index) => (
          <AnswerCardGameScreen key={index} answer={answer} />
        ))}
      </div>
    </>
  );
}

// ✅ Exporta o componente memorizado
export default memo(QuestionCard);
