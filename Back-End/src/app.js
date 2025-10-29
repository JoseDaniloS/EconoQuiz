import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authUser from "./routes/AuthUser.js";
import play from "./routes/Play.js"
import utils from "./routes/Utils.js"
import questions from "./routes/Questions.js"


dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

//Middlewares globais
app.use(cors());
app.use(express.json());

app.use("/auth", authUser);
app.use("/play", play)
app.use("/questions", questions)
app.use("/api", utils)

export default app;
