import { useEffect, useState } from "react";
import { FaTrophy, FaMedal } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { getRankingFetch } from "../../api/RankingFetch";

export default function RankingSection({ limit = 5 }) {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const data = await getRankingFetch();
        setRanking(data.ranking.slice(0, limit));
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRanking();
  }, [limit]);

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg text-center">
        <p className="text-gray-500 animate-pulse">Carregando ranking...</p>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg mb-12 transition-all duration-700">
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaTrophy className="text-yellow-500 text-3xl animate-bounce" />
        <h3 className="text-2xl font-bold text-gray-800">
          Ranking dos Melhores Jogadores
        </h3>
      </div>

      <div className="overflow-hidden rounded-xl">
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-3 px-4 text-left">Posição</th>
              <th className="py-3 px-4 text-left">Jogador</th>
              <th className="py-3 px-4 text-right">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length > 0 ? (
              ranking.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="py-3 px-4 flex items-center gap-2">
                    <FaMedal
                      className={`${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : index === 2
                          ? "text-amber-600"
                          : "text-gray-500"
                      }`}
                    />
                    #{index + 1}
                  </td>
                  <td className="py-3 px-4">{entry.user}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">
                    {entry.ranking.bestScore}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-4 text-center text-gray-500 italic"
                >
                  Nenhum jogador no ranking ainda 😢
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          className="text-primary font-semibold hover:underline"
          onClick={() => navigate("/ranking")}
        >
          Ver ranking completo →
        </button>
      </div>
    </section>
  );
}
