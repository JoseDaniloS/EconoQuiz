import { authToken } from "../middlewares/authMiddleware.js";
import { Router } from "express";

import { existsMatch } from "../utils/matchUtils.js";

import { Partida } from "../class/Partida.js";
import { updateMatch } from "../utils/matchUtils.js";
import { getQuestion } from "../utils/getQuestions.js";
import { logMessage } from "../utils/logs.js";
const router = Router();

router.post("/verify-answer", authToken, async (req, res) => {
  try {
    const { id_partida, answer } = req.body;

    //Validação dos campos obrigatórios
    if (!id_partida || !answer) {
      return res.status(400).json({
        message: "Campos obrigatórios: id_partida e answer.",
      });
    }

    //Busca partida existente
    const matchData = await existsMatch(id_partida);
    const match = Partida.fromDatabase(matchData);

    const finished = await match.isFinished();
    if (finished) {
      return res.status(200).json({
        message: "Partida finalizada!",
        isFinally: true,
        results: finished,
      });
    }

    // Log completo para depuração e auditoria
    const currentQuestion = match.getCurrentQuestion();

    const currectQuestionFromDatabase = await getQuestion(
      currentQuestion?.id,
      match.difficulty
    );
    const isCorrect = currectQuestionFromDatabase.isCorrect(answer);

    logMessage(
      `🎮 Jogador: ${match.id_user} | Partida: ${match.id} | Questão: ${currentQuestion.id} | Resposta enviada: "${answer}"`
    );
    let earnedPoints = 0;
    //Atualiza estado da partida
    match.nextQuestion();
    if (isCorrect) {
      match.incrementCorrectStreak();
      earnedPoints = match.addScore();
    } else {
      match.resetStreak();
    }
    //Atualiza no banco
    await updateMatch(match);

    //Retorno final
    return res.status(200).json({
      message: isCorrect ? "Acertou!" : "Errou!",
      correct: isCorrect,
      earnedPoints: earnedPoints,
      match: match.toPublicObject(),
    });
  } catch (error) {
    console.error("Erro ao verificar resposta:", error);
    return res.status(500).json({
      message: "Erro ao verificar resposta",
      error: error.message,
    });
  }
});

export default router;
