import React from "react"
import { FaStar } from "react-icons/fa"

export default function PointsHeaderGameScreen({ SCORE }) { 
    return (
        <div className="flex items-center space-x-2">
          <FaStar className="w-4 h-4 text-yellow-500" />
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide">Pontos</div>
            <div className="text-lg font-extrabold transition-all duration-300 hover:scale-110">
              {SCORE}
            </div>
          </div>
        </div>
    )
}