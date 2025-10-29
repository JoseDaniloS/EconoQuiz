import { useEffect } from "react";
import Acertou from "/Acertou.svg";
import Errou from "/Errou.png";
import CorrectSound from "/sounds/correct_answer_sound.mp3";
import WrongSound from "/sounds/wrong_answer_sound.wav";
import useSound from "use-sound";

export function ModalAnswer({
  isCorrect = false,
  points = 0,
  onNext,
  onQuit,
  setIsVisible,
}) {
  const [playCorrect] = useSound(CorrectSound, { volume: 0.5 });
  const [playWrong] = useSound(WrongSound, { volume: 0.5 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCorrect === true) playCorrect();
      if (isCorrect === false) playWrong();
    }, 150);

    return () => clearTimeout(timeout);
  }, [isCorrect, playCorrect, playWrong]);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-amber-50 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-amber-800 relative overflow-hidden">
        {/* Barra de cor no topo */}
        <div
          className={`absolute top-0 left-0 right-0 h-3 ${
            isCorrect
              ? "bg-gradient-to-r from-green-600 to-emerald-700"
              : "bg-gradient-to-r from-red-700 to-rose-800"
          }`}
        ></div>

        {/* Badge de status */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-black mb-6 border-2 ${
            isCorrect
              ? "bg-green-600 text-yellow-300 border-amber-900"
              : "bg-red-700 text-yellow-300 border-amber-900"
          }`}
          style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.3)" }}
        >
          <span className="text-lg">{isCorrect ? "✓" : "✕"}</span>
          <span className="tracking-wider">
            {isCorrect ? "CORRETO" : "INCORRETO"}
          </span>
        </div>

        {/* Imagem */}
        <div className="flex justify-center mb-6">
          <div className="w-32 bg-white p-4 rounded-xl border-4 border-amber-800 shadow-lg">
            <img
              src={isCorrect ? Acertou : Errou}
              alt={isCorrect ? "Acertou" : "Errou"}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-black text-center mb-6 text-amber-900 tracking-wide">
          {isCorrect ? "EXCELENTE!" : "TENTE NOVAMENTE!"}
        </h2>

        {/* Pontos ganhos */}
        {isCorrect && (
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-6 mb-6  relative shadow-xl">
            <div className="absolute top-2 right-2 text-3xl">🏆</div>
            <p className="text-amber-900 text-xs font-black mb-2 uppercase tracking-widest">
              Pontos Ganhos
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-6xl font-black text-amber-950"
                style={{
                  fontFamily: "monospace",
                  textShadow: "3px 3px 0px rgba(255,255,255,0.3)",
                }}
              >
                +{points}
              </span>
              <span className="text-2xl font-black text-amber-800">pts</span>
            </div>
          </div>
        )}

        {!isCorrect && (
          <p className="text-center text-amber-900 mb-6 text-lg font-bold">
            Você pode conseguir na próxima! 💪
          </p>
        )}

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={() => {
              if (setIsVisible) setIsVisible(false);
              if (onNext) onNext();
            }}
            className={`w-full ${
              isCorrect
                ? "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900"
                : "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900"
            } text-yellow-300 font-black py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] border-2 border-amber-900`}
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            PRÓXIMA QUESTÃO →
          </button>

          <button
            onClick={() => {
              if (setIsVisible) setIsVisible(false);
              if (onQuit) onQuit();
            }}
            className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-amber-300 hover:border-amber-400"
          >
            Abandonar Partida
          </button>
        </div>

        {/* Mensagem motivacional */}
        {isCorrect && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-amber-900 text-yellow-400 px-4 py-1 font-black text-xs tracking-widest border-2 border-amber-900 rounded">
              CONTINUE ASSIM! 🔥
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Exemplo de uso
export default function App() {
  const [showModal, setShowModal] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-amber-900 flex items-center justify-center p-4 gap-4">
      <button
        onClick={() => {
          setIsCorrect(true);
          setShowModal(true);
        }}
        className="bg-green-700 text-yellow-300 font-bold py-3 px-8 rounded-lg hover:bg-green-800 transition-colors border-2 border-amber-900"
      >
        Acertou
      </button>

      <button
        onClick={() => {
          setIsCorrect(false);
          setShowModal(true);
        }}
        className="bg-red-700 text-yellow-300 font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition-colors border-2 border-amber-900"
      >
        Errou
      </button>

      {showModal && (
        <ModalAnswer
          isCorrect={isCorrect}
          points={150}
          onNext={() => setShowModal(false)}
          onQuit={() => setShowModal(false)}
          setIsVisible={setShowModal}
        />
      )}
    </div>
  );
}
