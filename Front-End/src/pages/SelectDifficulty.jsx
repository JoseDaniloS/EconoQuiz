import React, { useState } from "react";
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

function DifficultyCard({ diff, isSelected, onSelect }) {
  const Icon = diff.icon;

  return (
    <button
      onClick={() => onSelect(diff.id)}
      className={`w-full ${
        diff.color
      } p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected ? "scale-105 shadow-lg" : ""
      }`}
    >
      <div className={` flex items-center gap-4`}>
        <div
          className={` w-16 h-16 rounded-xl flex items-center justify-center transition-colors`}
        >
          <Icon className="text-3xl text-white" />
        </div>

        <div className="flex-1 text-left">
          <h3 className="text-lg font-black text-gray-800">{diff.title}</h3>
          <p className="text-sm">{diff.description}</p>
        </div>

        {isSelected && (
          <FaCheckCircle className="text-2xl absolute -top-2 -right-2 text-blue-500" />
        )}
      </div>
    </button>
  );
}

export default function SelectDifficulty() {
  const { setDifficultyPlay } = usePlay();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleStart = () => {
    setDifficultyPlay(selectedDifficulty);
  };

  return (
    <div
      className="min-h-screen font-mono flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #8B1538 0%, #A21942 25%, #C41E3A 50%, #E63946 75%, #FF6B6B 100%)",
      }}
    >
      {/* Ícones animados e luzes */}
      <AnimatedBackground />

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center rounded-xl p-2 mb-4">
          <img
            src={Logo_Econoquiz}
            alt="Logo EconoQuiz"
            className="max-w-32 drop-shadow-xl"
          />
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            ⭐ Escolha a dificuldade ⭐
          </h2>
          <p className="text-sm text-gray-500">Selecione o nível do desafio</p>
        </div>

        {/* Lista de dificuldades */}
        <div className="space-y-4 mb-6">
          {DIFFICULTIES.map((diff) => (
            <DifficultyCard
              key={diff.id}
              diff={diff}
              isSelected={selectedDifficulty === diff.id}
              onSelect={setSelectedDifficulty}
            />
          ))}
        </div>

        {/* Botão Começar */}
        <button
          onClick={handleStart}
          disabled={!selectedDifficulty}
          className={`w-full py-4 rounded-xl font-black text-white text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedDifficulty
              ? "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <FaGamepad className="text-xl" />
          COMEÇAR A JOGAR
          <FaChartLine className="text-xl" />
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Boa sorte! 🍀</p>
        </div>

        {/* ODS Badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="font-bold">ODS 8</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
      </div>
    </div>
  );
}

/* 🌀 Componente separado apenas para a decoração animada */
function AnimatedBackground() {
  return (
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
      <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-20 -left-20 blur-3xl" />
      <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-40 -right-40 blur-3xl" />
    </>
  );
}
