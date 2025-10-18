import { Router } from "express";
import { authToken } from "../middlewares/authMiddleware.js";


const router = Router();

// Middleware `authToken` deve validar o token e, se for válido, chamar `next()`
router.post("/verify-token", authToken, (req, res) => {
  return res.status(200).json({ valid: true, message: "Token válido" });
});

export default router;
