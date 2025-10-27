import { authToken } from "../middlewares/authMiddleware.js";
import { Router } from "express";
import docClient from "../config/database.js";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { alreadyPlay } from "../validations/playAlready.js";
import { Question } from "../class/Question.js";
import { Partida } from "../class/Partida.js";
import { updatePartida } from "../utils/updatePlay.js";

const TABLE_NAME_QUESTIONS = process.env.DYNAMO_DB_TABLE_QUESTIONS;
const router = Router();

router.post("/verify-answer", authToken, async (req, res) => {
  try {
    const { id_question, id_partida, answer } = req.body;

    //Validação dos campos obrigatórios
    if (!id_question || !id_partida || !answer) {
      return res.status(400).json({
        message: "Campos obrigatórios: id_question, id_partida e answer.",
      });
    }

    //Busca partida existente
    const partidaData = await alreadyPlay(id_partida);
    const partida = Partida.fromDatabase(partidaData);

    if (partida.isFinished()) {
      const partidaResults = partida.isFinished();
      return res
        .status(200)
        .json({ message: "Partida finalizada!", results: partidaResults });
    }

    //Busca a questão
    const command = new GetCommand({
      TableName: TABLE_NAME_QUESTIONS,
      Key: { id: id_question, difficulty: partida.difficulty },
    });

    const result = await docClient.send(command);
    if (!result.Item) {
      return res.status(404).json({ message: "Questão não encontrada" });
    }

    const question = Question.fromDatabase(result.Item);
    const isCorrect = question.isCorrect(answer);

    //Atualiza estado da partida
    partida.proximaQuestao(id_question);
    if (isCorrect) {
      partida.incrementarAcertos();
    } else {
      partida.resetarAcertos();
    }
    //Atualiza no banco
    await updatePartida(partida);

    //Retorno final
    return res.status(200).json({
      message: isCorrect ? "Acertou!" : "Errou!",
      correct: isCorrect,
      tip: isCorrect ? null : question.getTip(),
      partida: partida.toPublicObject(),
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
