import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authUser from "./routes/AuthUser.js";


dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

//Middlewares globais
app.use(cors());
app.use(express.json());

app.use("/auth", authUser);

export default app;
