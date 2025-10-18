import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "./useAccountContext";
import { PlayFetch, questionFetch } from "../api/PlayFetch";
import { toast } from "react-toastify";

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [totalQuestoes, setTotalQuestoes] = useState(0);
  const [correctSequence, setCorrectSequence] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { user, token } = useAccountContext();
  const id = user?.id;

  const setDifficultyPlay = async (difficulty) => {
    if (!difficulty || !id || !token) return;

    setDifficulty(difficulty);

    try {
      const response = await PlayFetch(difficulty, token, id);
      toast.success(response.message);
      navigate(`/play/${response.partida.id}/${difficulty}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao iniciar a partida");
    }
  };

  const searchQuestions = async (id_partida) => {
    try {
      const response = await questionFetch(id_partida, token);
      setDifficulty(response.partida.difficulty);
      setCorrectSequence(response.partida.correctSequence);
      setQuestions(response.questions);
      setQuestaoAtual(1);
      setTotalQuestoes(response.questions.length);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PlayContext.Provider
      value={{
        difficulty,
        setDifficultyPlay,
        score,
        questaoAtual,
        totalQuestoes,
        searchQuestions,
        questions,
        correctSequence,
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
