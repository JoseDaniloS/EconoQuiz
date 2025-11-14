import { useEffect, useState } from "react";
import { FaTrophy, FaMedal, FaBolt } from "react-icons/fa";
import { getRankingFetch } from "../../api/RankingFetch";

export default function RankingSection({ limit = 10 }) {
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center border border-gray-200">
        <p className="text-gray-500 animate-pulse">Carregando ranking...</p>
      </section>
    );
  }

  const topThree = ranking.slice(0, 3);
  const others = ranking.slice(3);

  return (
    <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200 mb-12 transition-all duration-700">
      {/* Título */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <FaTrophy className="text-yellow-500 text-4xl drop-shadow-md animate-bounce" />
        <h3 className="text-3xl font-black text-gray-800 tracking-tight">
          TOP 10 MELHORES JOGADORES
        </h3>
      </div>

      {/* TOP 3 EM DESTAQUE */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {topThree.map((entry, index) => (
          <div
            key={index}
            className={`
              text-center p-6 rounded-2xl shadow-lg border
              transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer
              ${
                index === 0
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-600"
                  : index === 1
                  ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white border-gray-500"
                  : "bg-gradient-to-br from-amber-600 to-amber-700 text-white border-amber-800"
              }
            `}
          >
            <FaMedal className="text-4xl mx-auto mb-3 drop-shadow-md" />
            <h4 className="text-lg font-bold">{entry.user}</h4>

            <p className="text-sm mt-2 opacity-90">
              Sequência Máxima: {entry.ranking.bestStreak}
            </p>

            <p className="mt-3 text-2xl font-black drop-shadow">
              {entry.ranking.bestScore} pts
            </p>
          </div>
        ))}
      </div>

      {/* TABELA DO RESTANTE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-3 px-4 text-left">Posição</th>
              <th className="py-3 px-4 text-left">Jogador</th>
              <th className="py-3 px-4 text-left">Melhor Sequência</th>
              <th className="py-3 px-4 text-right">Pontos</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {others.length > 0 ? (
              others.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    #{index + 4}
                  </td>

                  <td className="py-3 px-4">{entry.user}</td>

                  <td className="py-3 px-4 flex items-center gap-2">
                    <FaBolt className="text-orange-500" />
                    {entry.ranking.bestStreak}
                  </td>

                  <td className="py-3 px-4 text-right font-bold text-primary">
                    {entry.ranking.bestScore}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-gray-500 italic"
                >
                  Nenhum outro jogador encontrado 😢
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
