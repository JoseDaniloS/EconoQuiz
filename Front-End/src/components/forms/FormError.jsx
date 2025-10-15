import React from "react";

/**
 * Componente reutilizável para exibir mensagens de erro de validação.
 */
export function FormError({ message }) {
  if (!message) return null;

  return (
    <p className="text-red-600 text-sm mt-1 transition-opacity duration-200">
      {message}
    </p>
  );
}
