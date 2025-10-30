import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { RegisterUser } from "../api/UserFetch";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    const isRegistered = await RegisterUser(data);
    if (isRegistered) {
      navigate("/login");
    }
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    handleRegister,
  };
}
