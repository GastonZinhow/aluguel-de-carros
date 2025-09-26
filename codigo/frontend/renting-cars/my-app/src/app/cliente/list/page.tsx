"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import { Edit, Trash2 } from "lucide-react"; // ícones

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

interface Client {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  address: string;
  occupation: string;
  income: number[];
  company: string[];
}

export default function ClientsListPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.get<Client[]>("/clients").then((res) => setClients(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este cliente?")) {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div
      className={poppins.className}
      style={{
        backgroundColor: "#d3d3d3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          width: "1000px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#003366" }}>
          Lista de Clientes
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Nome</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>CPF</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>RG</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Profissão</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Empresa(s)</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Renda</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <Link
                    href={`/cliente/edit/${c.id}`}
                    style={{ color: "#003366", textDecoration: "underline" }}
                  >
                    {c.name}
                  </Link>
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{c.cpf}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{c.rg}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{c.occupation}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {c.company.join(", ")}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {c.income.join(", ")}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px", display: "flex", gap: "0.5rem" }}>
                  <Link href={`/cliente/edit/${c.id}`} style={{ color: "#003366" }}>
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#DC2626",
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
