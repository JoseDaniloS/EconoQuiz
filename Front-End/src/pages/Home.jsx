import React, { useState, useEffect } from "react";
import { FaPlay, FaTrophy, FaUsers, FaBook } from "react-icons/fa";
import Footer from "../layout/Footer/Footer";
import { Header } from "../layout/Header/Header";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const features = [
    {
      icon: <FaBook className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Desafios Educativos",
      description: "Aprenda sobre trabalho decente e crescimento econômico",
    },
    {
      icon: <FaUsers className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Para Todos",
      description: "Conteúdo acessível e envolvente para todas as idades",
    },
    {
      icon: <FaTrophy className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Sistema de Pontuação",
      description: "Ganhe pontos e desbloqueie conquistas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-bg via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-secondary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-success/20 rounded-full blur-lg animate-pulse delay-500"></div>
      {/* Container responsivo */}
      <div className="w-full mx-auto bg-white sm:bg-transparent shadow-2xl sm:shadow-none">
        {/* Header responsivo */}
        <Header isAnimated={isAnimated} />

        {/* Conteúdo principal responsivo */}
        <main className="px-4 py-6 sm:px-6 sm:py-12">
          <div className="max-w-sm mx-auto sm:max-w-4xl">
            {/* Seção principal com call-to-action */}
            <div
              className={`text-center mb-8 sm:mb-16 transform transition-all duration-1000 delay-300 ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">
                    Objetivo de Desenvolvimento Sustentável 8
                  </span>
                  <span className="sm:hidden">ODS 8</span>
                </div>

                <h2 className="text-2xl sm:text-5xl font-bold text-text mb-4 sm:mb-6 leading-tight">
                  Descubra o Caminho para um
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block sm:inline">
                    {" "}
                    Trabalho Justo
                  </span>
                </h2>

                <p className="text-sm sm:text-xl text-gray-600 leading-relaxed sm:max-w-2xl sm:mx-auto">
                  <span className="sm:hidden">
                    Aprenda sobre trabalho decente e crescimento econômico
                    através de desafios educativos.
                  </span>
                  <span className="hidden sm:inline">
                    Embarque numa jornada educativa para aprender sobre trabalho
                    decente, crescimento econômico sustentável e direitos
                    trabalhistas através de desafios interativos.
                  </span>
                </p>
              </div>

              {/* Botão principal responsivo */}
              <button
                className="w-full sm:w-auto group relative bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white px-6 py-4 sm:px-12 sm:py-4 rounded-2xl sm:rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 overflow-hidden shadow-lg"
                onClick={() => navigate("/login")}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <FaPlay className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Jogar Agora</span>
                </div>
                <div className="hidden sm:block absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:top-full transition-all duration-700 -rotate-12 w-full"></div>
              </button>
            </div>

            {/* Cards de recursos responsivos */}
            <div
              className={`space-y-4 sm:grid sm:grid-cols-3 sm:gap-8 sm:space-y-0 mb-8 sm:mb-16 transform transition-all duration-1000 delay-500 ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300 sm:duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer border border-gray-100"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center space-x-4 sm:hidden">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                        hoveredCard === index
                          ? "bg-primary text-white scale-110"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-text mb-1 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-300 ${
                        hoveredCard === index
                          ? "bg-primary text-white scale-110"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Seção informativa sobre ODS 8 responsiva */}
            <div
              className={`bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center transform transition-all duration-1000 delay-700 ${
                isAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="text-lg sm:text-2xl font-bold text-text mb-3 sm:mb-4">
                Sobre o ODS 8
              </h3>
              <p className="text-xs sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 sm:max-w-3xl sm:mx-auto">
                <span className="sm:hidden">
                  Promove crescimento econômico sustentável, emprego pleno e
                  trabalho decente para todos. Aprenda como contribuir para um
                  mundo do trabalho mais justo.
                </span>
                <span className="hidden sm:inline">
                  O Objetivo de Desenvolvimento Sustentável 8 busca promover o
                  crescimento econômico sustentado, inclusivo e sustentável,
                  emprego pleno e produtivo e trabalho decente para todos.
                  Através deste jogo, você aprenderá como contribuir para um
                  mundo do trabalho mais justo e equitativo.
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  "Trabalho Decente",
                  "Crescimento",
                  "Igualdade",
                  "Sustentabilidade",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                  >
                    <span className="sm:hidden">{tag.split(" ")[0]}</span>
                    <span className="hidden sm:inline">{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
