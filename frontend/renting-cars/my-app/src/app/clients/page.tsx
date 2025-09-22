"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { toast } from "react-toastify";

interface Client {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  profession: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients");
        setClients(response.data);
      } catch (error) {
        toast.error("Erro ao buscar clientes");
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">👤 Clientes</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Nome</th>
              <th className="p-3">CPF</th>
              <th className="p-3">RG</th>
              <th className="p-3">Profissão</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Nenhum cliente encontrado
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{client.id}</td>
                  <td className="p-3">{client.name}</td>
                  <td className="p-3">{client.cpf}</td>
                  <td className="p-3">{client.rg}</td>
                  <td className="p-3">{client.profession}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
