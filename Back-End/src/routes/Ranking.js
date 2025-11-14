import { Router } from "express";
import { Ranking } from "../class/Ranking.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const RankingArray = await Ranking.getRanking();
    return res
      .status(200)
      .json({ message: "Ranking obtido com sucesso!", ranking: RankingArray });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar ranking",
      error: error.message,
    });
  }
});

export default router