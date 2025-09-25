"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

interface Client {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  address: string;
  profession: string;
  employer: string;
  income: string;
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
        height: "100vh",
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
          width: "800px",
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
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{c.name}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{c.cpf}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <a
                    href={`/clients/edit?id=${c.id}`}
                    style={{ marginRight: "10px", color: "#003366" }}
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
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
