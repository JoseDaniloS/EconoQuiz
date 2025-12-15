import { useEffect, useState } from "react";
import { FaTrophy, FaMedal, FaBolt, FaFire } from "react-icons/fa";
import { getRankingFetch } from "../../api/RankingFetch";

export default function RankingSection({ limit = 50 }) {
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
          RANKING
        </h3>
      </div>

      {/* TOP 3 EM DESTAQUE */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 mb-10">
        {topThree.map((entry, index) => (
          <div
            key={index}
            className={`
              text-center relative p-6 rounded-2xl shadow-lg border
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
            <span className="text-3xl font-extrabold opacity-70">
              #{index + 1}
            </span>
            <FaMedal className="text-2xl absolute right-5 top-5 drop-shadow-md" />
            <h4 className="text-lg font-bold">{entry.user}</h4>

            <p className="text-sm  opacity-90 flex items-center justify-center gap-1">
              Sequência Máxima: {entry.ranking.bestStreak}{" "}
              <FaFire size={20} color="#ffa500" />
            </p>

            <p className=" text-2xl font-black drop-shadow">
              {entry.ranking.bestScore} pts
            </p>
          </div>
        ))}
      </div>

      {/* RESTANTE */}
      <div className="grid grid-cols-4 max-md:grid-cols-1 gap-6">
        {others.map((other, index) => (
          <div
            key={index}
            className="flex flex-col relative p-3 bg-gradient-to-br rounded-2xl from-gray-500 to-gray-700 text-white border-gray-700"
          >
            <span className="absolute text-xl right-2 top-2 font-extrabold opacity-40">
              #{index + 4}
            </span>
            <h4 className="">{other.user}</h4>

            <div>
              <p className="text-sm flex gap-1 opacity-90">
                Sequência Máxima: {other.ranking.bestStreak}{" "}
                <FaFire size={20} color="#ffa500" />
              </p>
              <p className="text-xl font-black drop-shadow">
                {other.ranking.bestScore} pts
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
