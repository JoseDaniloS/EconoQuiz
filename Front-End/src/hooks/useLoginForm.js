import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";

/**
 * ✅ Hook personalizado para gerenciar o formulário de login
 */
export function useLoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // valida ao sair do campo
  });

  const handleLogin = (data) => {
    console.log("Login:", data);
    alert(`Bem-vindo ao ODS 8, ${data.username}!`);
    form.reset();
  };

  return { ...form, handleLogin };
}
