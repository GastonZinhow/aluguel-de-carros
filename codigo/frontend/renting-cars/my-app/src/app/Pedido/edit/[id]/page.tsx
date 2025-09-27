"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type OrderForm = {
  clientId: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  status: string;
};

type Client = {
  id: number;
  name: string;
};

type Vehicle = {
  id: number;
  model: string;
};

export default function EditOrderPage() {
  const { id } = useParams();
  const [form, setForm] = useState<OrderForm>({
    clientId: 0,
    vehicleId: 0,
    startDate: "",
    endDate: "",
    status: "AGUARDANDO_PAGAMENTO",
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>();

  useEffect(() => {
    // Carregar clientes e veículos cadastrados
    api.get<Client[]>("/clients").then((res) => setClients(res.data));
    api.get<Vehicle[]>("/vehicles").then((res) => setVehicles(res.data));

    // Carregar os dados do pedido atual
    if (id) {
      api.get(`/orders/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/orders/${id}`, form);
      setSuccessMessage("Pedido atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar pedido!");
    }
  };

  return (
    <>
      <Header></Header>
      <div
        className={poppins.className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#d3d3d3",
          padding: "2rem",
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
            Editar Pedido
          </h2>

          <select
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="" disabled>
              Selecione um Cliente
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="" disabled>
              Selecione um Veículo
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.model}
              </option>
            ))}
          </select>

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
            <option value="AGUARDANDO_PAGAMENTO">Aguardando Pagamento</option>
            <option value="PAGO">Pago</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
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
            Salvar Alterações
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
