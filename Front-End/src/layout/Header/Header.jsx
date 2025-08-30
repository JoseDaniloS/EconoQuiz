import React from "react";
import { FaBook, FaStar } from "react-icons/fa";

export function Header({ isAnimated }) {
  return (
    <header
      className={`bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-4 sm:px-6 sm:py-6 shadow-2xl transform transition-all duration-1000 ${
        isAnimated ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {" "}
      <div className="flex items-center justify-between sm:max-w-4xl sm:mx-auto">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <FaBook className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold">
              EconoQuiz
            </h1>
            <p className="text-white/80 text-xs sm:text-sm">
              ODS 8 - Trabalho Decente{" "}
              {window.innerWidth > 640 && "e Crescimento Econômico"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 bg-white/10 px-2 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
          <FaStar className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-300" />
          <span className="text-xs sm:text-sm font-medium">Jogo Educativo</span>
        </div>
      </div>
    </header>
  );
}
