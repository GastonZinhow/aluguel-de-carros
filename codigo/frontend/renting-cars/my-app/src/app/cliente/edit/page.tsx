"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

export default function EditClientPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    rg: "",
    address: "",
    profession: "",
    employer: "",
    income: "",
  });

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/clients/${id}`, form);
    alert("Cliente atualizado!");
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
          Editar Cliente
        </h2>

        {["name", "cpf", "rg", "address", "profession", "employer", "income"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(form as never)[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        ))}

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
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
