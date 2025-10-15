import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import { LoginUser } from "../api/UserFetch";

/**
 * ✅ Hook personalizado para gerenciar o formulário de login
 */
export function useLoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // valida ao sair do campo
  });

  const handleLogin = async (data) => {
    const token = await LoginUser(data);
    if (token) {
      localStorage.setItem("token", token);
      console.log("Login feito com sucesso!");
    } else {
      console.log("Falha no login");
    }
  };

  return { ...form, handleLogin };
}
