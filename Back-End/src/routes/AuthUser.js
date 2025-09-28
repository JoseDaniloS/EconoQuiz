import { Router } from "express";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../class/User.js";
import docClient from "../config/database.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

export const TABLE_NAME = process.env.DYNAMO_DB_TABLE_USER;

router.post("/registro", async (req, res) => {
  const { username, password } = req.body;

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        username,
      },
    });

    const response = await docClient.send(command);
    const usuarioExistente = response.Item;

    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const novoUsuario = User.createNewUser(username, password);

    const putCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: novoUsuario,
    });

    await docClient.send(putCommand);

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
});

//Rota de login do usuario
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        username,
      },
    });
    const response = await docClient.send(command);
    const user = response.Item;

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const usuarioExistente = User.fromDatabase(user);

    if (!usuarioExistente.comparePassword(password)) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = generateToken({ id: usuarioExistente.id }, "1h");
    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      user: usuarioExistente.toPublicObject(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
});

export default router;
