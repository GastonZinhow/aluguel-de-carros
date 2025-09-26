"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type ClientForm = {
  name: string;
  cpf: string;
  rg: string;
  occupation: string;
  address: string;
  income: number[];   
  company: string[];  
};

type AxiosErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export default function CreateClientPage() {
  const [form, setForm] = useState<ClientForm>({
    name: "",
    cpf: "",
    rg: "",
    occupation: "",
    address: "",
    income: [],
    company: [],
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,

      [name]: value,
    } as unknown as ClientForm));
  };


  const handleIncomeChange = (index: number, value: string) => {
    setForm((prev) => {
      const incomes = [...prev.income];
      incomes[index] = value === "" ? 0 : Number(value);
      return { ...prev, income: incomes };
    });
  };

  const addIncome = () => {
    setForm((prev) => ({ ...prev, income: [...prev.income, 0] }));
  };

  const removeIncome = (index: number) => {
    setForm((prev) => {
      const incomes = prev.income.filter((_, i) => i !== index);
      return { ...prev, income: incomes };
    });
  };

  const handleCompanyChange = (index: number, value: string) => {
    setForm((prev) => {
      const companies = [...prev.company];
      companies[index] = value;
      return { ...prev, company: companies };
    });
  };

  const addCompany = () => {
    setForm((prev) => ({ ...prev, company: [...prev.company, ""] }));
  };

  const removeCompany = (index: number) => {
    setForm((prev) => {
      const companies = prev.company.filter((_, i) => i !== index);
      return { ...prev, company: companies };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado!");
      return;
    }

    try {
 
      const payload: ClientForm = {
        ...form,
        income: form.income.map((n) => Number(n)), 
        company: form.company.map((s) => String(s)),
      };

      const res = await api.post<ClientForm>("/clients", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`Cliente ${res.data.name} cadastrado com sucesso!`);
      setForm({
        name: "",
        cpf: "",
        rg: "",
        occupation: "",
        address: "",
        income: [],
        company: [],
      });
    } catch (error: unknown) {
      const err = error as AxiosErrorResponse;
      console.error(err);

      if (err.response?.status === 403) {
        alert("Você não tem permissão para criar clientes. Faça login novamente.");
      } else if (err.response?.data?.message) {
        alert(`Erro: ${err.response.data.message}`);
      } else {
        alert("Erro ao cadastrar cliente!");
      }
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#003366" }}>
          Cadastrar Cliente
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={form.rg}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="occupation"
          placeholder="Profissão"
          value={form.occupation}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="address"
          placeholder="Endereço"
          value={form.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Rendas</label>
          {form.income.length === 0 && (
            <div style={{ marginBottom: "0.5rem", color: "#666" }}>Nenhuma renda adicionada</div>
          )}
          {form.income.map((value, idx) => (
            <div key={idx} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                type="number"
                step="0.01"
                placeholder={`Renda ${idx + 1}`}
                value={String(value)}
                onChange={(e) => handleIncomeChange(idx, e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              <button type="button" onClick={() => removeIncome(idx)} style={smallButtonStyle}>
                Remover
              </button>
            </div>
          ))}

          <button type="button" onClick={addIncome} style={secondaryButtonStyle}>
            + Adicionar renda
          </button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Empregadores / Empresas</label>
          {form.company.length === 0 && (
            <div style={{ marginBottom: "0.5rem", color: "#666" }}>Nenhuma empresa adicionada</div>
          )}
          {form.company.map((value, idx) => (
            <div key={idx} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                type="text"
                placeholder={`Empresa ${idx + 1}`}
                value={value}
                onChange={(e) => handleCompanyChange(idx, e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                required
              />
              <button type="button" onClick={() => removeCompany(idx)} style={smallButtonStyle}>
                Remover
              </button>
            </div>
          ))}

          <button type="button" onClick={addCompany} style={secondaryButtonStyle}>
            + Adicionar empresa
          </button>
        </div>

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
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const smallButtonStyle: React.CSSProperties = {
  padding: "8px 10px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
  padding: "8px 12px",
  backgroundColor: "#0077bb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
