import { useEffect, useState } from "react";
import { FaTimes, FaLightbulb, FaPlay, FaGift } from "react-icons/fa";
import TimerBar from "./TimeBar";

export default function PopUp() {
  const [showModal, setShowModal] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [canUnlock, setCanUnlock] = useState(false);
  const TRINTA_SEGUNDOS = 10000;
  const handleWatchAd = () => {
    setShowAd(true);
    setCanUnlock(false);

    //Libera a dica
    setTimeout(() => {
      setCanUnlock(true);
    }, TRINTA_SEGUNDOS);
  };
  //Ao clicar no botão o tempo STOP e abre o modal
  return (
    <div className="absolute bg-yellow-600/90 rounded-full top-1/10 left-5">
      <button
        aria-label="Abrir dicas"
        onClick={() => setShowModal(true)}
        className="p-3 max-md:p-2"
      >
        <FaLightbulb />
      </button>
      {showModal ? (
        <ModalPopUp
          onClick={() => {
            setShowModal(false), setShowAd(false);
          }}
          onWatchAd={handleWatchAd}
          showAd={showAd}
          canUnlock={canUnlock}
        />
      ) : null}
    </div>
  );
}

function ModalPopUp({ onClick, onWatchAd, showAd, canUnlock }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm w-screen h-screen flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full mx-4 transform animate-scale-in relative overflow-hidden"
      >
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative">
          <button
            onClick={onClick}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaLightbulb className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Precisa de ajuda?</h2>
              <p className="text-white/80 text-sm">Desbloqueie uma dica útil</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {!showAd ? (
            <ContainerBlock onClick={onClick} onWatchAd={onWatchAd} />
          ) : (
            <AdsenseBlock showAd={showAd} canUnlock={canUnlock} />
          )}

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Os anúncios nos ajudam a manter o jogo gratuito 💚
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdsenseBlock({ showAd, canUnlock }) {
  const TRINTA_SEGUNDOS = 10;
  const [timeLeft, setTimeLeft] = useState(TRINTA_SEGUNDOS);
  if (!showAd) return null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showAd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error(e);
      }
    }
  }, [showAd]);

  return (
    <div className="flex flex-col">
      <TimerBar duration={TRINTA_SEGUNDOS} timeLeft={timeLeft} />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7315594581672176"
        data-ad-slot="5550619895"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {timeLeft === 0 && canUnlock && (
        <button className="w-full group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-lg">
          <FaLightbulb className="w-4 group-hover:-translate-y-2 transition-all duration-400 h-4" />
          <span>Ver Dica</span>
        </button>
      )}
    </div>
  );
}

function ContainerBlock({ onClick, onWatchAd }) {
  return (
    <div className="text-center mb-6">
      <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaGift className="w-8 h-8 text-red-600" />
      </div>
      <p className="text-gray-600 leading-relaxed">
        Assista a um anúncio rápido e ganhe uma dica valiosa para esta questão!
      </p>

      {/* Benefícios */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm">
          O que você ganha:
        </h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Dica específica sobre a questão</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Melhore suas chances de acerto</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Continue aprendendo sobre ODS 8</span>
          </li>
        </ul>
      </div>

      {/* Botões */}
      <div className="space-y-3">
        <button
          onClick={onWatchAd}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaPlay className="w-4 h-4" />
          <span>Ver Anúncio</span>
          <div className="bg-white/20 px-2 py-1 rounded-full text-xs">30s</div>
        </button>

        <button
          onClick={onClick}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Continuar sem dica
        </button>
      </div>
    </div>
  );
}
