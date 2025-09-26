"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type OrderForm = {
  clientName: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  status: string;
};

type AxiosErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export default function CreateOrderPage() {
  const [form, setForm] = useState<OrderForm>({
    clientName: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    status: "WAITING_PAYMENT",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado!");
      return;
    }

    try {
      await api.post<OrderForm>("/orders", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Pedido criado com sucesso!");
      setForm({
        clientName: "",
        vehicleModel: "",
        startDate: "",
        endDate: "",
        status: "WAITING_PAYMENT",
      });

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      console.error(err);

      if (err.response?.status === 403) {
        alert(
          "Você não tem permissão para criar pedidos. Faça login novamente."
        );
      } else if (err.response?.data?.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert("Erro ao criar pedido!");
      }
    }
  };

  return (
    <>
      <Header></Header>
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
            width: "600px",
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
            Criar Pedido
          </h2>

          <input
            type="text"
            name="clientName"
            placeholder="Nome do Cliente"
            value={form.clientName}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="vehicleModel"
            placeholder="Modelo do Veículo"
            value={form.vehicleModel}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="date"
            name="startDate"
            placeholder="Data de Início"
            value={form.startDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="date"
            name="endDate"
            placeholder="Data de Término"
            value={form.endDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="WAITING_PAYMENT">Aguardando Pagamento</option>
            <option value="PAID">Pago</option>
            <option value="SHIPPED">Enviado</option>
            <option value="DELIVERED">Entregue</option>
            <option value="CANCELED">Cancelado</option>
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
            Salvar
          </button>

          {successMessage && (
            <p
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
