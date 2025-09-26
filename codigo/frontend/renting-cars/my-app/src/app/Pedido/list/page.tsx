"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });

interface OrderResponse {
  id: number;
  client: {
    id: number;
    name: string;
  };
  vehicle: {
    id: number;
    model: string;
  };
  startDate: string;
  endDate: string;
  orderStatus: string;
}

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

  useEffect(() => {
    api.get<OrderResponse[]>("/orders").then((res) => {
      const mapped: Order[] = res.data.map((o) => ({
        id: o.id,
        clientName: o.client?.name ?? "—",
        vehicleModel: o.vehicle?.model ?? "—",
        startDate: o.startDate,
        endDate: o.endDate,
        status: o.orderStatus,
      }));
      setOrders(mapped);
    }).catch((err) => {
      console.error("Erro ao buscar pedidos:", err);
    });
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
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
          width: "800px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "#003366",
          }}
        >
          Meus Pedidos
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Cliente</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Veículo</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Início</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Fim</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o.clientName}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o.vehicleModel}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{formatDate(o.startDate)}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{formatDate(o.endDate)}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
