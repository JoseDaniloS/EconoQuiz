import React from "react";
import { FaTrophy } from "react-icons/fa";

export default function QuestionProgressHeaderGameScreen({
  currentQuestion,
  TOTAL_QUESTIONS = 0,
}) {
  // Calcular progresso
  const PROGRESS = (currentQuestion / TOTAL_QUESTIONS) * 100;
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <FaTrophy className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-semibold">
          {currentQuestion}/{TOTAL_QUESTIONS}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${PROGRESS}%` }}
        />
      </div>
    </div>
  );
}
