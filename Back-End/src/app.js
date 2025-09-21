import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authToken } from "./middlewares/authMiddleware.js";
import { generateToken } from "./utils/jwt.js";

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

//Middlewares globais
app.use(cors());
app.use(express.json());

const DB_USERS = [
  { id: 1, username: "danil", password: "123" },
  { id: 2, username: "maria", password: "456" },
  { id: 3, username: "joao", password: "789" },
];

app.post("/test", (req, res) => {
  const { username, password } = req.body;

  const user = DB_USERS.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) return res.status(401).json({ message: "Credenciais Inválidas." });

  const token = generateToken({ id: user.id });
  res.json({ token });
});

app.get("/protected", authToken, (req, res) => {
  res.json({ message: "Acesso autorizado a rota protegida!" });
});

export default app;
