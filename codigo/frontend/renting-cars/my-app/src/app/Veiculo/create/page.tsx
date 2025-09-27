"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type VehicleForm = {
  plate: string;
  registration: string;
  year: number;
  brand: string;
  model: string;
};

type AxiosErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export default function CreateVehiclePage() {
  const [form, setForm] = useState<VehicleForm>({
    plate: "",
    registration: "",
    year: 0,
    brand: "",
    model: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await api.post<VehicleForm>("/vehicles", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Veículo cadastrado com sucesso!");
      setForm({
        plate: "",
        registration: "",
        year: 0,
        brand: "",
        model: "",
      });

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      console.error(err);

      if (err.response?.status === 403) {
        alert(
          "Você não tem permissão para criar veículos. Faça login novamente."
        );
      } else if (err.response?.data?.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert("Erro ao cadastrar veículo!");
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
            Cadastrar Veículo
          </h2>

          <input
            type="text"
            name="plate"
            placeholder="Placa"
            value={form.plate}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="registration"
            placeholder="Registro"
            value={form.registration}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Ano"
            value={form.year}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Marca"
            value={form.brand}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="model"
            placeholder="Modelo"
            value={form.model}
            onChange={handleChange}
            style={inputStyle}
            required
          />

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
