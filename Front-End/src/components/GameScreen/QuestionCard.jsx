import { memo, useMemo } from "react";
import { FaBriefcase, FaChartLine, FaClock, FaLeaf } from "react-icons/fa";
import AnswerCardGameScreen from "./AnsewerCard";
import { usePlay } from "../../hooks/usePlayContext";

function QuestionCard() {
  const { questions, currentQuestion } = usePlay();

  // 🔹 Evita erro se o array ainda estiver vazio
  const question = questions?.[currentQuestion] ?? null;

  // 🔹 Memoriza ícones e cores (não recria arrays a cada render)
  const icons = useMemo(
    () => [<FaBriefcase />, <FaChartLine />, <FaClock />, <FaLeaf />],
    []
  );
  const colors = useMemo(
    () => ["#D32F2F", "#1976D2", "#FBC02D", "#388E3C"],
    []
  );

  // 🔹 Mapeia as opções de resposta
  const answers = useMemo(() => {
    if (!question?.options) return [];
    return question.options.map((option, index) => ({
      text: option,
      color: colors[index % colors.length],
      icon: icons[index % icons.length],
    }));
  }, [question, icons, colors]);

  // 🔹 Render seguro
  if (!question) {
    return (
      <div className="text-center text-gray-200 font-semibold">
        Carregando pergunta...
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {question.statement}
      </h2>
      <div className="grid md:grid-cols-2 mt-auto grid-cols-1 gap-4 w-full">
        {answers.map((answer, index) => (
          <AnswerCardGameScreen key={index} answer={answer} />
        ))}
      </div>
    </>
  );
}

export default memo(QuestionCard);
