import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z
      .string()
      .min(3, "O nome de usuário deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
