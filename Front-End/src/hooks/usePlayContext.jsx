import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccountContext } from "./useAccountContext";
import { PlayFetch, QuitMatchFetch, verifyAnswerFetch } from "../api/PlayFetch";

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
  const [currentStreak, setCorrectSequence] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);

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
        setIsEndGame(false);
        navigate(`/play/${response.partida.id}/${difficultyLevel}`);
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
  const matchData = useCallback(
    async (match) => {
      try {
        if (match?.answeredQuestions.length === match?.questions.length) {
          setIsEndGame(true);
          return;
        }
        setDifficulty(match.difficulty);
        setCorrectSequence(match?.currentStreak);
        setQuestions(match?.questions);
        setCurrentQuestion(match?.answeredQuestions.length);
        setTotalQuestions(match?.questions.length);
        setScore(match?.score);
      } catch (error) {
        console.error("Erro ao carregar questões:", error);
        toast.error("Erro ao buscar questões da partida.");
      }
    },
    [token]
  );

  useEffect(() => {
    if (isEndGame) {
      setIsCorrect(null);
      setEarnedPoints(0);
    }
  }, [isEndGame]);

  useEffect(() => {
    if (isCorrect === true) setCorrectAnswers((prev) => prev + 1);
  }, [isCorrect]);

  const verifyAnswer = useCallback(
    async (answer, matchId) => {
      try {
        const response = await verifyAnswerFetch(answer, matchId, token);
        if (response.isFinally) {
          setIsEndGame(true);
          return;
        }

        matchData(response.match);
        setEarnedPoints(response.earnedPoints);
        setIsCorrect(response.correct);
      } catch (error) {
        console.error("Erro ao verificar resposta:", error);
        toast.error("Erro ao verificar resposta.");
      }
    },
    [token]
  );

  const quitMatch = useCallback(
    async (matchId) => {
      try {
        await QuitMatchFetch(matchId, token);
        toast.success("Partida encerrada com sucesso!");
        navigate("/");
      } catch (error) {
        toast.error("Erro ao encerrar a partida.");
        console.error("Erro ao encerrar a partida:", error);
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
      currentStreak,
      questions,
      startGame,
      matchData,
      setScore,
      setCurrentQuestion,
      verifyAnswer,
      setIsCorrect,
      isCorrect,
      earnedPoints,
      quitMatch,
      isEndGame,
      correctAnswers,
    }),
    [
      difficulty,
      score,
      currentQuestion,
      totalQuestions,
      currentStreak,
      questions,
      startGame,
      matchData,
      quitMatch,
      isCorrect,
      earnedPoints,
      isEndGame,
      correctAnswers,
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
