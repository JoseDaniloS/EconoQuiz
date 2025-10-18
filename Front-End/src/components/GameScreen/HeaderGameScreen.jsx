import React, { useEffect, useState } from "react";
import TimerBar from "./TimeBar";
import PointsHeaderGameScreen from "./HeaderGameScreen/Points";
import QuestionProgressHeaderGameScreen from "./HeaderGameScreen/QuestionProgress";
import TimerHeaderGameScreen from "./HeaderGameScreen/Timer";
import ActiveStreakHeaderGameScreen from "./HeaderGameScreen/ActiveStreak";

import useSound from "use-sound";
import startSoundFile from "/sounds/audio-gamer.mp3";
import { usePlay } from "../../hooks/usePlayContext";

export const DURATION_ANSWER = 15;

export default function HeaderGameScreen() {
  const { score, questaoAtual, totalQuestoes, correctSequence } = usePlay();
  const [timeLeft, setTimeLeft] = useState(DURATION_ANSWER);

  const [playStartSound, { stop }] = useSound(startSoundFile, { volume: 0.7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          stop();
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
          currentQuestion={questaoAtual}
          TOTAL_QUESTIONS={totalQuestoes}
        />
        {/* Pontuação */}
        <PointsHeaderGameScreen SCORE={score} />
      </div>

      <div className="flex justify-between mb-2 items-center">
        {/* Sequência de acertos */}
        <ActiveStreakHeaderGameScreen streak={correctSequence} />
        {/* Timer */}
        <TimerHeaderGameScreen timeLeft={timeLeft} />
      </div>
      <TimerBar timeLeft={timeLeft} duration={DURATION_ANSWER} />
    </div>
  );
}
