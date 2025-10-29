import { verifyToken } from "../utils/jwt.js";

export function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

