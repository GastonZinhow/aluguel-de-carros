"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password, role });
      toast.success("Usuário registrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao registrar usuário.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Criar Conta
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none font-[Petra]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none font-[Petra]"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none font-[Petra]"
          >
            <option value="USER">Cliente</option>
            <option value="AGENT">Agente</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Já tem conta?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
