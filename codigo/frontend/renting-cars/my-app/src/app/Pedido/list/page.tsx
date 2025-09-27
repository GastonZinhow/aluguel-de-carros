"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Header from "@/app/components/Header";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

interface Order {
  id: number;
  clientName: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>();

  useEffect(() => {
    api.get<Order[]>("/orders").then((res) => setOrders(res.data));
  }, []);

  const handleDelete = async () => {
    if (orderToDelete !== null) {
      await api.delete(`/orders/${orderToDelete}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderToDelete));
      setShowModal(false);
      setOrderToDelete(null);
    }
  };

  const openModal = (id: number) => {
    setOrderToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setOrderToDelete(null);
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
            <h2 style={{ color: "#003366" }}>Lista de Pedidos</h2>
            <Link
              href="/Pedido/create"
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
              Criar Pedido
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
                  Cliente
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Veículo
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Data de Início
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Data de Término
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Status
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {order.clientName}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {order.vehicleModel}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {order.startDate}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {order.endDate}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {order.status}
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
                      href={`/Pedido/edit/${order.id}`}
                      style={{ color: "#003366" }}
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => openModal(order.id)}
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
                Tem certeza de que deseja excluir este pedido?
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
