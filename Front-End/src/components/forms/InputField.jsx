import React from "react";
import { FormError } from "./FormError";

/**
 * Campo de entrada reutilizável.
 */
export function InputField({
  label,
  icon: Icon,
  type = "text",
  register,
  name,
  error,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-red-800 font-semibold mb-2 flex items-center gap-2"
      >
        {Icon && <Icon className="text-red-600" />}
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 focus:outline-none bg-red-50/30 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-red-300 focus:border-red-600 focus:ring-2 focus:ring-red-200"
        }`}
      />

      <FormError message={error?.message} />
    </div>
  );
}
