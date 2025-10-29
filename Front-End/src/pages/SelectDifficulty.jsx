import React, { useState, useMemo } from "react";
import {
  FaTrophy,
  FaBolt,
  FaFire,
  FaGamepad,
  FaChartLine,
  FaCheckCircle,
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
    color: "from-green-600 to-green-700",
    description: "Perguntas básicas",
    points: "1.1x Pontos",
  },
  {
    id: "medium",
    title: "MÉDIO",
    icon: FaBolt,
    color: "from-yellow-600 to-amber-700",
    description: "Desafio intermediário",
    points: "1.2x Pontos",
  },
  {
    id: "hard",
    title: "DIFÍCIL",
    icon: FaFire,
    color: "from-orange-600 to-red-700",
    description: "Para especialistas",
    points: "1.3x Pontos",
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
      className={`w-full h-full bg-gradient-to-r ${
        diff.color
      } p-5 rounded-lg cursor-pointer transition-all duration-200 relative border-4 ${
        isSelected
          ? "border-yellow-300 scale-105 shadow-xl"
          : "border-amber-900"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-amber-900 rounded-lg flex items-center justify-center border-2 border-amber-800">
          <Icon className="text-2xl text-yellow-300" />
        </div>

        <div className="flex-1 text-left text-white">
          <h3
            className="text-lg font-black tracking-wide"
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            {diff.title}
          </h3>
          <p className="text-sm font-semibold opacity-90">{diff.description}</p>
          <p
            className="text-xs font-bold text-yellow-300 mt-1"
            style={{ fontFamily: "monospace" }}
          >
            {diff.points}
          </p>
        </div>

        {isSelected && (
          <div className="w-8 h-8 absolute -right-2 -top-2 bg-yellow-300 rounded-full flex items-center justify-center border-2 border-amber-900">
            <FaCheckCircle className="text-xl text-green-700" />
          </div>
        )}
      </div>
    </button>
  );
});

/**
 * Página de seleção de dificuldade
 */
export default function SelectDifficulty() {
  const [selected, setSelected] = useState(null);
  const { startGame } = usePlay();

  const handleStart = () => {
    if (selected) startGame(selected);
  };

  const isDisabled = !selected;

  return (
    <div className="min-h-screen font-mono flex items-center justify-center p-4 bg-gradient-to-br from-red-900 via-amber-900 to-red-900">
      <div className="bg-amber-50 rounded-2xl shadow-2xl p-8 w-full max-w-5xl border-4 border-amber-800">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-amber-900 p-4 rounded-xl border-4 border-amber-800 shadow-lg">
            <img
              src={Logo_Econoquiz}
              alt="Logo EconoQuiz"
              className="max-w-24"
            />
          </div>
        </div>

        {/* Título */}
        <header className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-red-800 to-amber-800 text-yellow-300 px-6 py-2 rounded-lg mb-3 border-2 border-amber-900 shadow-lg">
            <h1
              className="text-2xl font-black tracking-wider"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              SELECIONE A DIFICULDADE
            </h1>
          </div>
          <p className="text-sm font-bold text-amber-900">
            Escolha o nível do desafio
          </p>
        </header>

        {/* Opções */}
        <section className="space-y-4  md:flex gap-5  mb-6">
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
          className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-200 flex items-center justify-center gap-3 border-4 ${
            isDisabled
              ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-yellow-300 border-amber-900 shadow-lg transform hover:scale-105"
          }`}
          style={
            !isDisabled ? { textShadow: "2px 2px 0px rgba(0,0,0,0.3)" } : {}
          }
        >
          <FaGamepad className="text-xl" />
          COMEÇAR PARTIDA
          <FaChartLine className="text-xl" />
        </button>

        {/* Rodapé */}
        <footer className="text-center mt-6">
          <p className="text-sm font-bold text-amber-800 mb-3">Boa sorte! 🍀</p>

          <div className="inline-block bg-amber-900 text-yellow-400 px-4 py-1 font-black text-xs tracking-widest border-2 border-amber-900 rounded">
            ODS 8 • TRABALHO DECENTE
          </div>
        </footer>
      </div>
    </div>
  );
}
