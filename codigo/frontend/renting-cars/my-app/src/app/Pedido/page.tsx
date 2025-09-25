"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function OrdersPage() {
  const [form, setForm] = useState({
    clientId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
    status: "PENDENTE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/orders", form);
      alert("Pedido criado com sucesso!");
      setForm({ clientId: "", vehicleId: "", startDate: "", endDate: "", status: "PENDENTE" });
    } catch {
      alert("Erro ao criar pedido!");
    }
  };

  return (
    <div
      className={poppins.className}
      style={{
        backgroundColor: "#d3d3d3",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          width: "500px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#003366" }}>
          Criar Pedido
        </h2>

        <input
          type="text"
          name="clientId"
          placeholder="ID do Cliente"
          value={form.clientId}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          name="vehicleId"
          placeholder="ID do Veículo"
          value={form.vehicleId}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="PENDENTE">Pendente</option>
          <option value="APROVADO">Aprovado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Criar Pedido
        </button>
      </form>
    </div>
  );
}
