import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "./useAccountContext";

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [questaoAtual, setQuestaoAtual] = useState(null);
  const [correctSequence, setCorrectSequence] = useState(null);
  const navigate = useNavigate();
  const { user } = useAccountContext();
    const id = user?.id;
    console.log(user)

  const setDifficultyPlay = (difficulty) => {
    if (difficulty) {
      setDifficulty(difficulty);
      navigate(`/play/${id}/${difficulty}`);
    }
  };

  return (
    <PlayContext.Provider
      value={{
        difficulty,
        setDifficultyPlay,
        score,
        setScore,
        questaoAtual,
        setQuestaoAtual,
        correctSequence,
        setCorrectSequence,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}

// Hook para usar mais fácil
export function usePlay() {
  return useContext(PlayContext);
}
