import { FaGithub, FaLinkedin } from "react-icons/fa";

const team = [
  {
    name: "José Danilo",
    github: "https://github.com/JoseDaniloS",
    linkedin: "https://www.linkedin.com/in/josedanilos",
  },
  {
    name: "Abnoan",
    github: "https://github.com/abnoan-dev",
    linkedin: "https://www.linkedin.com/in/abnoan-gabriel-49329b296/",
  },
  {
    name: "Jessica",
    github: "https://github.com/Jessicaisabela",
    linkedin: "https://www.linkedin.com/in/jessica-isabela-887881372/",
  },
];

export default function Footer() {
  return (
    <footer className="text-center py-6 sm:py-8 text-white text-xs sm:text-sm px-4 bg-primary">
      {/* Mensagem sobre ODS */}
      <div className="flex justify-between max-md:flex-col max-w-4xl mx-auto">
        <p className="mb-2">
          <span className="sm:hidden">
            Desenvolvido para promover a educação sobre os ODS
          </span>
          <span className="hidden sm:inline">
            Desenvolvido para promover a educação sobre os Objetivos de
            Desenvolvimento Sustentável
          </span>
        </p>
        {/* Equipe */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-2">
          <span className="font-semibold text-white">Desenvolvido por:</span>
          <div className="flex gap-4 flex-col">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex justify-between max-md:justify-center items-center gap-2"
              >
                <span>{member.name}</span>
                <div className="flex gap-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright opcional */}
      <p className="mt-2 text-white text-xs">
        &copy; {new Date().getFullYear()} ODS 8 Quiz - Projeto de Teste de
        Software 2025.2 - UFERSA
      </p>
    </footer>
  );
}
