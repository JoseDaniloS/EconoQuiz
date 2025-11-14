import React, { useState } from "react";
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
import { motion } from "framer-motion";

// Lista de dificuldades
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

/* ------------------------------
   Cartão de dificuldade animado  
--------------------------------*/
const DifficultyCard = React.memo(({ diff, isSelected, onSelect, index }) => {
  const Icon = diff.icon;

  return (
    <motion.button
      onClick={() => onSelect(diff.id)}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full h-full bg-gradient-to-r ${
        diff.color
      } p-5 rounded-lg cursor-pointer
      transition-all duration-200 relative border-4 ${
        isSelected
          ? "border-yellow-300 scale-[1.03] shadow-xl"
          : "border-amber-900"
      }`}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="w-14 h-14 bg-amber-900 rounded-lg flex items-center justify-center border-2 border-amber-800"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring" }}
        >
          <Icon className="text-2xl text-yellow-300" />
        </motion.div>

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
          <motion.div
            className="w-8 h-8 absolute -right-2 -top-2 bg-yellow-300 rounded-full flex items-center justify-center border-2 border-amber-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaCheckCircle className="text-xl text-green-700" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
});

/* ------------------------------
       Página SelectDifficulty  
--------------------------------*/
export default function SelectDifficulty() {
  const [selected, setSelected] = useState(null);
  const { startGame } = usePlay();

  const handleStart = () => {
    if (selected) startGame(selected);
  };

  return (
    <motion.div
      className="min-h-screen font-mono flex items-center justify-center p-4 bg-gradient-to-br from-red-900 via-amber-900 to-red-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-amber-50 rounded-2xl shadow-2xl p-8 w-full max-w-5xl border-4 border-amber-800"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-amber-900 p-4 rounded-xl border-4 border-amber-800 shadow-lg">
            <img src={Logo_Econoquiz} alt="Logo" className="max-w-24" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.header
          className="text-center mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.header>

        {/* Cards */}
        <section className="space-y-4 md:flex gap-5 mb-8">
          {DIFFICULTIES.map((diff, index) => (
            <DifficultyCard
              key={diff.id}
              diff={diff}
              index={index}
              isSelected={selected === diff.id}
              onSelect={setSelected}
            />
          ))}
        </section>

        {/* Botão iniciar */}
        <motion.button
          className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 border-4 ${
            selected
              ? "bg-gradient-to-r from-red-700 to-red-800 text-yellow-300 border-amber-900 shadow-lg"
              : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
          }`}
          disabled={!selected}
          onClick={handleStart}
          whileTap={selected ? { scale: 0.95 } : {}}
          whileHover={selected ? { scale: 1.03 } : {}}
          transition={{ type: "spring", stiffness: 150 }}
          style={selected ? { textShadow: "2px 2px 0px rgba(0,0,0,0.3)" } : {}}
        >
          <FaGamepad className="text-xl" /> COMEÇAR PARTIDA{" "}
          <FaChartLine className="text-xl" />
        </motion.button>

        {/* Rodapé */}
        <motion.footer
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-bold text-amber-800 mb-3">Boa sorte! 🍀</p>
          <div className="inline-block bg-amber-900 text-yellow-400 px-4 py-1 font-black text-xs tracking-widest border-2 border-amber-900 rounded">
            ODS 8 • TRABALHO DECENTE
          </div>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}
