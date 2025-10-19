import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuário cadastrado:\nNome: ${formData.username}\nEmail: ${formData.email}`);
    navigate("/"); // Volta para a página inicial após registro
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-rose-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 sm:w-96">
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-6">
          Crie sua conta
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transition"
          >
            Registrar
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-rose-500 hover:text-rose-600 font-semibold transition"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
