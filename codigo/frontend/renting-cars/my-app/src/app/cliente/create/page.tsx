"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type ClientForm = {
  name: string;
  cpf: string;
  rg: string;
  occupation: string;
  address: string;
  income: number | "";
  company: string;
};

type AxiosErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export default function CreateClientPage() {
  const [form, setForm] = useState<ClientForm>({
    name: "",
    cpf: "",
    rg: "",
    occupation: "",
    address: "",
    income: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "income" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado!");
      return;
    }

    try {
      const res = await api.post<ClientForm>("/clients", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Cliente ${res.data.name} cadastrado com sucesso!`);
      setForm({
        name: "",
        cpf: "",
        rg: "",
        occupation: "",
        address: "",
        income: "",
        company: "",
      });
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      console.error(err);

      if (err.response?.status === 403) {
        alert("Você não tem permissão para criar clientes. Faça login novamente.");
      } else if (err.response?.data?.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert("Erro ao cadastrar cliente!");
      }
    }
  };

  const fields: { name: keyof ClientForm; label: string; type: string }[] = [
    { name: "name", label: "Nome", type: "text" },
    { name: "cpf", label: "CPF", type: "text" },
    { name: "rg", label: "RG", type: "text" },
    { name: "occupation", label: "Profissão", type: "text" },
    { name: "address", label: "Endereço", type: "text" },
    { name: "income", label: "Renda", type: "number" },
    { name: "company", label: "Empregador", type: "text" },
  ];

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
          Cadastrar Cliente
        </h2>

        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.label}
            value={form[field.name]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
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
          Salvar
        </button>
      </form>
    </div>
  );
}
