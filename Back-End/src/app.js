import express from "express";
import dotenv from "dotenv";
import authUser from "./routes/AuthUser.js";
import play from "./routes/Play.js"
import utils from "./routes/Utils.js"
import questions from "./routes/Questions.js"
import cors from "cors";


dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://econoquiz.ufersa.dev.br",
  "https://www.econoquiz.ufersa.dev.br",
];

export const SECRET_KEY = process.env.SECRET_KEY;

const app = express();


app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))

//reponse to preflight requests
app.options("*", cors());

app.use(express.json());

app.use("/auth", authUser);
app.use("/play", play)
app.use("/questions", questions)
app.use("/api", utils)

export default app;
