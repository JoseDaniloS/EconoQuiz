import { FaBolt } from "react-icons/fa";

export default function ActiveStreakHeaderGameScreen({ streak }) {
  return (
    <div className="flex items-center space-x-2">
      {streak > 0 && (
        <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
          <FaBolt className="w-3 h-3 text-orange-500" />
          <span className="text-xs font-bold text-orange-600">{streak}x</span>
        </div>
      )}
    </div>
  );
}
