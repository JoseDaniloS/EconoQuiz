import { useState } from "react";
import { usePlay } from "../hooks/usePlayContext";
import { useNavigate } from "react-router-dom";

export function EndGameScreen({ }) {
  const navigate = useNavigate();
  const { score, totalQuestions, correctAnswers } = usePlay();

  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(0);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Desempenho Excepcional!";
    if (accuracy >= 70) return "Ótimo Trabalho!";
    if (accuracy >= 50) return "Bom Desempenho!";
    return "Continue Tentando!";
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-900 to-amber-900 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-4 border-amber-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-amber-800 p-8 text-center">
          <h1
            className="text-4xl font-black text-yellow-300 mb-2"
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            PARTIDA FINALIZADA
          </h1>
          <p className="text-amber-100 font-semibold">
            {getPerformanceMessage()}
          </p>
        </div>

        <div className="p-8">
          {/* Pontuação principal */}
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-8 mb-6 border-4 border-amber-800 text-center">
            <p className="text-amber-900 font-bold text-sm mb-2">
              PONTUAÇÃO FINAL
            </p>
            <div
              className="text-6xl font-black text-amber-950"
              style={{ fontFamily: "monospace" }}
            >
              {score}
            </div>
            <p className="text-amber-800 font-bold text-lg mt-1">pontos</p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border-2 border-amber-300">
              <p className="text-amber-800 font-bold text-xs mb-2">Acertos</p>
              <div
                className="text-3xl font-black text-red-800"
                style={{ fontFamily: "monospace" }}
              >
                {correctAnswers}/{totalQuestions}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border-2 border-amber-300">
              <p className="text-amber-800 font-bold text-xs mb-2">Precisão</p>
              <div
                className="text-3xl font-black text-red-800"
                style={{ fontFamily: "monospace" }}
              >
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-xs font-bold text-amber-900">Progresso</p>
              <p className="text-xs font-bold text-red-800">
                {correctAnswers}/{totalQuestions}
              </p>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-4 overflow-hidden border-2 border-amber-800">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-amber-600"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <button
              onClick={() => {
                navigate("/play");
              }}
              className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-yellow-300 font-bold py-4 px-6 rounded-xl border-2 border-amber-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Jogar Novamente
            </button>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-4 px-6 rounded-xl border-2 border-amber-300 transition-all duration-200"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
