"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Header from "@/app/components/Header";

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
  const [showModal, setShowModal] = useState(false); 
  const [clientToDelete, setClientToDelete] = useState<number | null>(); 

  useEffect(() => {
    api.get<Client[]>("/clients").then((res) => setClients(res.data));
  }, []);

  const handleDelete = async () => {
    if (clientToDelete !== null) {
      await api.delete(`/clients/${clientToDelete}`);
      setClients((prev) => prev.filter((c) => c.id !== clientToDelete));
      setShowModal(false);
      setClientToDelete(null); 
    }
  };

  const openModal = (id: number) => {
    setClientToDelete(id); 
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
    setClientToDelete(null); 
  };

  return (
    <>
      <Header></Header>
      <div
        className={poppins.className}
        style={{
          backgroundColor: "#d3d3d3",
          minHeight: "100vh",
          padding: "2rem",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            width: "1000px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            margin: "0 auto",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#003366" }}>Lista de Clientes</h2>
            <Link
              href="/cliente/create"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#003366",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              <PlusCircle size={20} />
              Criar Cliente
            </Link>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Nome
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  CPF
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>RG</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Profissão
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {c.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {c.cpf}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {c.rg}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {c.occupation}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Link
                      href={`/cliente/edit/${c.id}`}
                      style={{ color: "#003366" }}
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => openModal(c.id)}
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

        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "10px",
                width: "400px",
                textAlign: "center",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "#003366" }}>
                Confirmar Exclusão
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Tem certeza de que deseja excluir este cliente?
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={closeModal}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#DC2626",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
