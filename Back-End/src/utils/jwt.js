import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../app.js";

export function generateToken(payload, expiresIn = "24h") {
  if (!SECRET_KEY) throw new Error("SECRET_KEY não definida");
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token) {
  if (!SECRET_KEY) throw new Error("SECRET_KEY não definida");
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Token inválido");
  }
}
