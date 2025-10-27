import { Router } from "express";
import { authToken } from "../middlewares/authMiddleware.js";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Partida } from "../class/Partida.js";
import docClient from "../config/database.js";
import { verificarSeUsuarioExiste } from "../validations/userValidation.js";
import { Difficulty } from "../class/Difficulty.js";
import { alreadyPlay } from "../validations/playAlready.js";
import { getQuestions } from "../utils/getQuestions.js";

const router = Router();
const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;

router.post("/", authToken, async (req, res) => {
  const { id, difficulty } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID obrigatorio!" });
  }

  if (!difficulty) {
    return res.status(400).json({ message: "Dificuldade obrigatoria!" });
  }

  let dificuldade;
  try {
    dificuldade = new Difficulty(difficulty);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  const usuarioExistente = await verificarSeUsuarioExiste(id);
  if (!usuarioExistente) {
    return res.status(404).json({ message: "Usuario não existe" });
  }

  const questions = await getQuestions(difficulty);

  const partida = new Partida(id, dificuldade.level, questions);

  const command = new PutCommand({
    TableName: TABLE_NAME_PARTIDAS,
    Item: partida.toPublicObject(),
  });

  try {
    await docClient.send(command);
    return res.status(201).json({
      message: "Partida criada com sucesso!",
      partida: partida.toPublicObject(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar partida", error: error.message });
  }
});

router.get("/:id", authToken, async (req, res) => {
  try {
    const { id } = req.params;
    const partida = await alreadyPlay(id);

    if (!partida) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }

    return res.status(200).json(partida);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
