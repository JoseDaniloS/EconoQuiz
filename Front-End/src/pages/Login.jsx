import React from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import Logo_Econoquiz from "/Logo_EconoQuiz.svg";
import { InputField } from "../components/forms/InputField";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaChartLine,
  FaUsers,
  FaCogs,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    handleLogin,
  } = useLoginForm();

  return (
    <div
      className="min-h-screen relative font-mono overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #8B1538 0%, #A21942 25%, #C41E3A 50%, #E63946 75%, #FF6B6B 100%)",
      }}
    >
      {/* Ícones animados e decorações */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FaBriefcase
          className="absolute text-white/10 animate-bounce"
          style={{
            fontSize: "80px",
            left: "10%",
            top: "15%",
            animationDuration: "3s",
          }}
        />
        <FaChartLine
          className="absolute text-white/10 animate-bounce"
          style={{
            fontSize: "70px",
            right: "15%",
            top: "20%",
            animationDuration: "4s",
            animationDelay: "1s",
          }}
        />
        <FaUsers
          className="absolute text-white/10 animate-bounce"
          style={{
            fontSize: "90px",
            left: "5%",
            bottom: "20%",
            animationDuration: "3.5s",
            animationDelay: "0.5s",
          }}
        />
        <FaCogs
          className="absolute text-white/10 animate-bounce"
          style={{
            fontSize: "75px",
            right: "8%",
            bottom: "25%",
            animationDuration: "4.5s",
          }}
        />
        <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-40 -right-40 blur-3xl"></div>
      </div>

      {/* Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-red-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 gap-4 p-4">
                {[...Array(24)].map((_, i) => (
                  <FaStar key={i} className="text-red-600" />
                ))}
              </div>
            </div>

            <div className="relative z-10">
              {/* Cabeçalho */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center rounded-xl p-2 mb-4">
                  <img
                    src={Logo_Econoquiz}
                    alt="Logo EconoQuiz"
                    className="max-w-32 drop-shadow-xl"
                  />
                </div>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <FaStar className="text-yellow-500" />
                  <span>Entre e jogue para aprender!</span>
                  <FaStar className="text-yellow-500" />
                </div>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                <InputField
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  icon={FaEnvelope}
                  register={register}
                  error={errors.email}
                />

                <InputField
                  label="Senha"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  icon={FaLock}
                  register={register}
                  error={errors.password}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 transition-all duration-150 cursor-pointer transform hover:translate-x-0.5 hover:translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaBriefcase />
                  COMEÇAR A JOGAR
                  <FaChartLine />
                </button>
              </form>

              {/* Rodapé */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Ainda não tem uma conta?{" "}
                  <Link
                    to="/register"
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Registre-se
                  </Link>
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-red-700 font-semibold">
                  <div className="h-1 w-12 bg-red-600 rounded"></div>
                  <span>ODS 8</span>
                  <div className="h-1 w-12 bg-red-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
