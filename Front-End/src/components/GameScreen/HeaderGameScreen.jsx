import React, { useEffect, useState } from "react";
import TimerBar from "./TimeBar";
import PointsHeaderGameScreen from "./HeaderGameScreen/Points";
import QuestionProgressHeaderGameScreen from "./HeaderGameScreen/QuestionProgress";
import TimerHeaderGameScreen from "./HeaderGameScreen/Timer";
import ActiveStreakHeaderGameScreen from "./HeaderGameScreen/ActiveStreak";

export const DURATION_ANSWER = 15;

export default function HeaderGameScreen() {
  const currentQuestion = 1;
  const TOTAL_QUESTIONS = 10;
  const SCORE = 0;
  const streak = [true, true, true, false];
  const [timeLeft, setTimeLeft] = useState(DURATION_ANSWER);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl p-4 mb-2">
      {/* Linha superior: Progresso e Timer */}
      <div className="flex justify-between items-center mb-3">
        {/* Progresso da questão */}
        <QuestionProgressHeaderGameScreen
          currentQuestion={currentQuestion}
          TOTAL_QUESTIONS={TOTAL_QUESTIONS}
        />
        {/* Pontuação */}
        <PointsHeaderGameScreen SCORE={SCORE} />
      </div>

      <div className="flex justify-between mb-2 items-center">
        {/* Sequência de acertos */}
        <ActiveStreakHeaderGameScreen streak={streak} />
        {/* Timer */}
        <TimerHeaderGameScreen timeLeft={timeLeft} />
      </div>
      <TimerBar timeLeft={timeLeft} duration={DURATION_ANSWER} />
    </div>
  );
}
