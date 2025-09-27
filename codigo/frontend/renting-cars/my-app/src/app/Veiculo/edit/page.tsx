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

type VehicleForm = {
  plate: string;
  registration: string;
  year: number;
  brand: string;
  model: string;
};

export default function EditVehiclePage() {
  const { id } = useParams();
  const [form, setForm] = useState<VehicleForm>({
    plate: "",
    registration: "",
    year: 0,
    brand: "",
    model: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>();

  useEffect(() => {
    if (id) {
      api.get(`/vehicles/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/vehicles/${id}`, form);
      setSuccessMessage("Veículo atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar veículo!");
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
            Editar Veículo
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
