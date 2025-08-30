import React from "react";
import { FaClock } from "react-icons/fa";

export default function TimerHeaderGameScreen({ timeLeft }) {
  return (
    <div
      className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 ${
        timeLeft <= 5
          ? "bg-red-100 text-red-600 animate-pulse"
          : timeLeft <= 10
          ? "bg-yellow-100 text-yellow-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      <FaClock className="w-4 h-4" />
      <span className="font-bold text-sm">{timeLeft}s</span>
    </div>
  );
}
