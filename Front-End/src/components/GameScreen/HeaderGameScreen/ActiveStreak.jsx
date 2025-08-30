import { FaFire } from "react-icons/fa";

export default function ActiveStreakHeaderGameScreen({ streak }) {
  // Calcular quantos acertos seguidos na sequência atual
  const getActiveStreak = () => {
    let count = 0;
    for (let i = streak.length - 1; i >= 0; i--) {
      if (streak[i]) count++;
    }
    return count;
  };

  const activeStreak = getActiveStreak();
  return (
    <div className="flex items-center space-x-2">
      {activeStreak > 0 && (
        <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
          <FaFire className="w-3 h-3 text-orange-500" />
          <span className="text-xs font-bold text-orange-600">
            {activeStreak}x
          </span>
        </div>
      )}
    </div>
  );
}
