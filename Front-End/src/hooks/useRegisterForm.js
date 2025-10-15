import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { RegisterUser } from "../api/UserFetch";

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

  const handleRegister = async (data) => {
    await RegisterUser(data);
  
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    handleRegister,
  };
}