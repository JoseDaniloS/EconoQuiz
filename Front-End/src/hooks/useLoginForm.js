import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import { LoginUser } from "../api/UserFetch";
import { useAccountContext } from "./useAccountContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * ✅ Hook personalizado para gerenciar o formulário de login
 */
export function useLoginForm() {
  const { login } = useAccountContext();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // valida ao sair do campo
  });

  const handleLogin = async (data) => {
    const response = await LoginUser(data);
    if (response) {
      const { token, user } = response;
      login(token, user);
      toast.success(response.message);
      navigate("/play");
    }
  };

  return { ...form, handleLogin };
}
