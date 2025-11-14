import React, { useEffect, useState } from "react";
import TimerBar from "./TimeBar";
import PointsHeaderGameScreen from "./HeaderGameScreen/Points";
import QuestionProgressHeaderGameScreen from "./HeaderGameScreen/QuestionProgress";
import TimerHeaderGameScreen from "./HeaderGameScreen/Timer";
import ActiveStreakHeaderGameScreen from "./HeaderGameScreen/ActiveStreak";

import useSound from "use-sound";
import startSoundFile from "/sounds/audio-gamer.mp3";
import { usePlay } from "../../hooks/usePlayContext";
import { useParams } from "react-router-dom";

export default function HeaderGameScreen() {
  const { score, currentQuestion, totalQuestions, currentStreak, difficulty } =
    usePlay();

  const DIFFYCULTY_DURATION = {
    easy: 15,
    medium: 25,
    hard: 30,
  };
  const DURATION_ANSWER = DIFFYCULTY_DURATION[difficulty];
  const [timeLeft, setTimeLeft] = useState(DURATION_ANSWER);
  const { verifyAnswer } = usePlay();
  const { id_partida } = useParams();

  const [playStartSound, { stop }] = useSound(startSoundFile, { volume: 0.7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          stop();
          verifyAnswer("error", id_partida);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    playStartSound();

    return () => {
      clearInterval(timer);
      stop();
    };
  }, [playStartSound, stop]);

  return (
    <div className="w-full relative rounded-2xl p-4 mb-2">
      {/* Linha superior: Progresso e Timer */}
      <div className="flex justify-between items-center mb-3">
        {/* Progresso da questão */}
        <QuestionProgressHeaderGameScreen
          currentQuestion={currentQuestion}
          TOTAL_QUESTIONS={totalQuestions}
        />
        {/* Pontuação */}
        <PointsHeaderGameScreen SCORE={score} />
      </div>

      <div className="flex justify-between mb-2 items-center">
        {/* Sequência de acertos */}
        <ActiveStreakHeaderGameScreen streak={currentStreak} />
        {/* Timer */}
        <TimerHeaderGameScreen timeLeft={timeLeft} />
      </div>
      <TimerBar timeLeft={timeLeft} duration={DURATION_ANSWER} />
    </div>
  );
}
