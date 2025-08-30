import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";

//Biblioteca para ADS: npm install react-google-adsense

export default function PopUp() {
  const [showModal, setShowModal] = useState(false);
    //Ao clicar no botão o tempo STOP e abre o modal
  return (
    <div className="absolute bg-yellow-600/90 rounded-full top-1/3 left-5">
      <button onClick={() => setShowModal(true)} className="p-3">
        <FaLightbulb />
      </button>
      {showModal ? <ModalPopUp /> : null}
    </div>
  );
}

function ModalPopUp() {
  return (
      <div className="fixed top-0 left-0 bg-black/50 w-screen h-screen">
          Ver Dica + ADS
          FECHAR
    </div>
  );
}
