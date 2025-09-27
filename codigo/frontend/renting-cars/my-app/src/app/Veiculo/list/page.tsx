"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Header from "@/app/components/Header";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

interface Vehicle {
  id: number;
  plate: string;
  registration: string;
  year: number;
  brand: string;
  model: string;
}

export default function VehiclesListPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>();
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    api.get<Vehicle[]>("/vehicles").then((res) => setVehicles(res.data));
  }, []);

  const handleDelete = async () => {
    if (vehicleToDelete !== null) {
      await api.delete(`/vehicles/${vehicleToDelete}`);
      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle.id !== vehicleToDelete)
      );
      setShowModal(false);
      setVehicleToDelete(null);
      setHasOrders(false);
    }
  };

  const openModal = async (id: number) => {
    setVehicleToDelete(id);
    const response = await api.get(`/orders?vehicleId=${id}`);
    setHasOrders(response.data.length > 0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setVehicleToDelete(null);
    setHasOrders(false);
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
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#003366" }}>Lista de Veículos</h2>
            <Link
              href="/Veiculo/create"
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
              Criar Veículo
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
                  Placa
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Registro
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Ano
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Marca
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Modelo
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {vehicle.plate}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {vehicle.registration}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {vehicle.year}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {vehicle.brand}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {vehicle.model}
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
                      href={`/Veiculo/edit/${vehicle.id}`}
                      style={{ color: "#003366" }}
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => openModal(vehicle.id)}
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
                {hasOrders
                  ? "Este veículo está associado a um ou mais pedidos. Excluir este veículo também excluirá os pedidos associados. Tem certeza de que deseja continuar?"
                  : "Tem certeza de que deseja excluir este veículo?"}
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
