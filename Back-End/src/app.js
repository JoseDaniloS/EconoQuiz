import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/AuthUser.js";
import play from "./routes/Play.js";
import utils from "./routes/Utils.js";
import questions from "./routes/Questions.js";
import ranking from "./routes/Ranking.js";

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(express.json());

app.use("/auth", authUser);
app.use("/play", play);
app.use("/questions", questions);
app.use("/api", utils);
app.use("/ranking", ranking);

export default app;
