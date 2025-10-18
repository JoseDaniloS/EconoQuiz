import { authToken } from "../middlewares/authMiddleware.js";
import { Router } from "express";
import docClient from "../config/database.js";
import { getQuestions } from "../utils/getQuestions.js";
import { alreadyPlay } from "../validations/playAlready.js";

const TABLE_NAME_QUESTIONS = process.env.DYNAMO_DB_TABLE_QUESTIONS;
const router = Router();

router.get("/:id_partida", authToken, async (req, res) => {
  try {
    const { id_partida } = req.params;

    // 1️⃣ Verifica se a partida existe
    const partida = await alreadyPlay(id_partida);
    if (!partida) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }

    const { difficulty } = partida;
    if (!difficulty) {
      return res
        .status(400)
        .json({ message: "Partida sem dificuldade definida" });
    }

    // 2️⃣ Busca as questões dessa dificuldade
    const questions = await getQuestions(difficulty);
    if (!questions.length) {
      return res.status(404).json({ message: "Nenhuma questão encontrada" });
    }

    // 3️⃣ Retorna as informações da partida + questões
    return res.status(200).json({
      partida,
      questions,
    });
  } catch (error) {
    console.error("Erro ao buscar partida:", error);
    return res.status(500).json({
      message: "Erro ao buscar partida",
      error: error.message,
    });
  }
});

router.post(
  "/:id_partida/:difficulty/correct-question/:id",
  authToken,
  async (req, res) => {
    const { id, id_partida, difficulty } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID obrigatorio" });
    }

    if (!id_partida)
      return res.status(400).json({ message: "ID de partida obrigatorio" });

    if (!difficulty) {
      return res.status(400).json({ message: "Dificuldade obrigatoria" });
    }

    const command = new GetCommand({
      TableName: TABLE_NAME_QUESTIONS,
      Key: { id: id, difficulty: difficulty },
    });
    try {
      const result = await docClient.send(command);
      if (!result.Item) {
        return res.status(404).json({ message: "Questão não encontrada" });
      }
      return res.json(result.Item);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar questão",
        error: error.message,
      });
    }
  }
);

export default router;
