import React, { useState, useMemo } from "react";
import {
  FaTrophy,
  FaBolt,
  FaFire,
  FaGamepad,
  FaChartLine,
  FaCheckCircle,
  FaBriefcase,
  FaUsers,
  FaCogs,
} from "react-icons/fa";
import Logo_Econoquiz from "/Logo_EconoQuiz.svg";
import { usePlay } from "../hooks/usePlayContext";

/**
 * Lista de dificuldades disponíveis
 */
const DIFFICULTIES = [
  {
    id: "easy",
    title: "FÁCIL",
    icon: FaTrophy,
    color: "bg-green-500 hover:bg-green-600",
    description: "Perguntas básicas",
    points: "10 pontos",
  },
  {
    id: "medium",
    title: "MÉDIO",
    icon: FaBolt,
    color: "bg-yellow-500 hover:bg-yellow-600",
    description: "Desafio intermediário",
    points: "20 pontos",
  },
  {
    id: "hard",
    title: "DIFÍCIL",
    icon: FaFire,
    color: "bg-red-600 hover:bg-red-700",
    description: "Para especialistas",
    points: "30 pontos",
  },
];

/**
 * Cartão de seleção de dificuldade
 */
const DifficultyCard = React.memo(({ diff, isSelected, onSelect }) => {
  const Icon = diff.icon;

  return (
    <button
      onClick={() => onSelect(diff.id)}
      className={`w-full ${
        diff.color
      } p-4 rounded-xl cursor-pointer transition-all duration-300 relative ${
        isSelected ? "scale-105 shadow-xl" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center">
          <Icon className="text-3xl text-white" />
        </div>

        <div className="flex-1 text-left text-gray-50">
          <h3 className="text-lg font-black">{diff.title}</h3>
          <p className="text-sm opacity-80">{diff.description}</p>
        </div>

        {isSelected && (
          <FaCheckCircle className="text-2xl absolute -top-2 -right-2 text-blue-500 drop-shadow-md" />
        )}
      </div>
    </button>
  );
});

/**
 * Página de seleção de dificuldade
 */
export default function SelectDifficulty() {
  const { startGame } = usePlay();
  const [selected, setSelected] = useState(null);

  const handleStart = () => {
    if (selected) startGame(selected);
  };

  const isDisabled = !selected;

  const backgroundStyle = useMemo(
    () => ({
      background:
        "linear-gradient(135deg, #8B1538 0%, #A21942 25%, #C41E3A 50%, #E63946 75%, #FF6B6B 100%)",
    }),
    []
  );

  return (
    <div
      className="min-h-screen font-mono flex items-center justify-center p-4 relative overflow-hidden"
      style={backgroundStyle}
    >
      <AnimatedBackground />

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={Logo_Econoquiz}
            alt="Logo EconoQuiz"
            className="max-w-32 drop-shadow-xl"
          />
        </div>

        {/* Título */}
        <header className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            ⭐ Escolha a dificuldade ⭐
          </h2>
          <p className="text-sm text-gray-500">Selecione o nível do desafio</p>
        </header>

        {/* Opções */}
        <section className="space-y-4 mb-6">
          {DIFFICULTIES.map((diff) => (
            <DifficultyCard
              key={diff.id}
              diff={diff}
              isSelected={selected === diff.id}
              onSelect={setSelected}
            />
          ))}
        </section>

        {/* Botão iniciar */}
        <button
          onClick={handleStart}
          disabled={isDisabled}
          className={`w-full py-4 rounded-xl font-black text-white text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
        >
          <FaGamepad className="text-xl" />
          COMEÇAR A JOGAR
          <FaChartLine className="text-xl" />
        </button>

        {/* Rodapé */}
        <footer className="text-center mt-6 text-sm text-gray-500">
          <p>Boa sorte! 🍀</p>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="font-bold">ODS 8</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>
        </footer>
      </div>
    </div>
  );
}

/**
 * 🔹 Ícones flutuantes e fundo decorativo animado
 */
const AnimatedBackground = React.memo(() => (
  <>
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

    {/* Efeitos de luz */}
    <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-20 -left-20 blur-3xl" />
    <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-40 -right-40 blur-3xl" />
  </>
));
