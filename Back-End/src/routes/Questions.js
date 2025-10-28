import { authToken } from "../middlewares/authMiddleware.js";
import { Router } from "express";

import { existsMatch } from "../utils/matchUtils.js";

import { Partida } from "../class/Partida.js";
import { updateMatch } from "../utils/matchUtils.js";
import { getQuestion } from "../utils/getQuestions.js";
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

    //Busca match existente
    const partidaData = await existsMatch(id_partida);
    const match = Partida.fromDatabase(partidaData);

    const currentQuestion = match.getCurrentQuestion();
    const finished = await match.isFinished();
    if (finished) {
      return res
        .status(200)
        .json({ message: "Partida finalizada!", results: finished });
    }
    const currectQuestionFromDatabase = await getQuestion(currentQuestion.id, match.difficulty);
    const isCorrect = currectQuestionFromDatabase.isCorrect(answer);

    //Atualiza estado da match
    match.nextQuestion();
    if (isCorrect) {
      match.incrementarAcertos();
      match.adicionarPontuacao()
    } else {
      match.resetarAcertos();
    }
    //Atualiza no banco
    await updateMatch(match);

    //Retorno final
    return res.status(200).json({
      message: isCorrect ? "Acertou!" : "Errou!",
      correct: isCorrect,
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
