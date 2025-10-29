import z from "zod"; // ✅ Esquema de validação com Zod
export const registerSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e _")
      .nonempty("O nome de usuário é obrigatório"),
    email: z
      .string()
      .email("E-mail inválido")
      .nonempty("O e-mail é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .nonempty("A senha é obrigatória"),
    confirmPassword: z.string().nonempty("Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
