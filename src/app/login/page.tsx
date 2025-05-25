"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");
    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    const token = result.access_token || result.token;
    const user = result.user || { id: result.id, email: result.email };

    if (res.ok && token && user?.id) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);
      router.push("/cars");
    } else {
      setError(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-20 space-y-4 bg-white p-6 rounded border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-700">Iniciar Sesión</h1>
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Correo electrónico"
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50 text-gray-700"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Contraseña"
        className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50 text-gray-700"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
        Entrar
      </button>
    </form>
  );
}