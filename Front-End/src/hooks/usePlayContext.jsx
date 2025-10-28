import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccountContext } from "./useAccountContext";
import { PlayFetch } from "../api/PlayFetch";

const PlayContext = createContext();

/**
 * Provider responsável por gerenciar o estado do jogo (partida, pontuação, perguntas, etc.)
 */
export function PlayProvider({ children }) {
  const navigate = useNavigate();
  const { user, token } = useAccountContext();

  // 🎯 Estados centrais da partida
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctSequence, setCorrectSequence] = useState(null);
  const [questions, setQuestions] = useState([]);

  const userId = user?.id;

  /**
   * 🔹 Inicia uma nova partida com base na dificuldade selecionada
   */
  const startGame = useCallback(
    async (difficultyLevel) => {
      if (!difficultyLevel || !userId || !token) {
        toast.error("Erro ao iniciar a partida. Dados insuficientes.");
        return;
      }

      try {
        setDifficulty(difficultyLevel);

        const response = await PlayFetch(difficultyLevel, token, userId);
        toast.success(response.message);
        navigate(`/play/${response.partida.id}/${difficultyLevel}`);
        loadQuestions(response.partida);
      } catch (error) {
        console.error("Erro ao iniciar a partida:", error);
        toast.error("Não foi possível iniciar a partida.");
      }
    },
    [navigate, token, userId]
  );

  /**
   * 🔹 Busca as questões da partida atual
   */
  const loadQuestions = useCallback(
    async (matchId) => {
      try {
        
        setDifficulty(partida.difficulty);
        setCorrectSequence(partida?.correctSequence);
        setQuestions(partida?.questions);
        setCurrentQuestion(1);
        setTotalQuestions(partida?.questions.length);
      } catch (error) {
        console.error("Erro ao carregar questões:", error);
        toast.error("Erro ao buscar questões da partida.");
      }
    },
    [token]
  );

  /**
   * 🎯 Estado do jogo memorizado para evitar re-renderizações desnecessárias
   */
  const contextValue = useMemo(
    () => ({
      difficulty,
      score,
      currentQuestion,
      totalQuestions,
      correctSequence,
      questions,
      startGame,
      loadQuestions,
      setScore,
      setCurrentQuestion,
    }),
    [
      difficulty,
      score,
      currentQuestion,
      totalQuestions,
      correctSequence,
      questions,
      startGame,
      loadQuestions,
    ]
  );

  return (
    <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>
  );
}

/**
 * Hook personalizado para consumir o contexto de jogo
 */
export function usePlay() {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlay deve ser usado dentro de um PlayProvider");
  }
  return context;
}
