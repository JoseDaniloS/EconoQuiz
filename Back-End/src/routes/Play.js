import { Router } from "express";
import { authToken } from "../middlewares/authMiddleware.js";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Partida } from "../class/Partida.js";
import docClient from "../config/database.js";
import { verificarSeUsuarioExiste } from "../validations/userValidation.js";
import { User } from "../class/User.js";

const router = Router();

const TABLE_NAME_PARTIDAS = process.env.DYNAMO_DB_TABLE_PARTIDA;
router.post("/", authToken, async (req, res) => {
  const { id } = req.body || {};

  if (!id) {
    return res.status(400).json({ message: "ID obrigatorio!" });
  }
  const usuarioExistente = await verificarSeUsuarioExiste(id);
  if (!usuarioExistente) {
    return res.status(404).json({ message: "Usuario não existe" });
  }
    const objetoUsuario = User.fromDatabase(usuarioExistente);
    const usuarioPlano = objetoUsuario.toPublicObject()
  

  const partida = new Partida(null, usuarioPlano);
  const command = new PutCommand({
    TableName: TABLE_NAME_PARTIDAS,
    Item: partida,
  });

    try {
    await docClient.send(command);
    return res
      .status(201)
      .json({ message: "Partida criada com sucesso!", id: partida.id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar partida", error: error });
  }
});

router.get("/:id", authToken, async (req, res) => {
  const { id } = req.params;

  const command = new GetCommand({
    TableName: TABLE_NAME_PARTIDAS,
    Key: { id },
  });
  try {
    const result = await docClient.send(command);

    if (!result.Item) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }
    return res.json(result.Item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar partida", error: error });
  }
});

export default router;
