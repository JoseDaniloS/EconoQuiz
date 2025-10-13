import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const handleRegister = (data) => {
    console.log("✅ Dados de registro:", data);
    // Aqui você pode chamar a API de cadastro, por exemplo:
    // await api.post("/register", data);
    reset();
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    handleRegister,
  };
}