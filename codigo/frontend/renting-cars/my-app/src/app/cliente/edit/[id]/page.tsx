"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

interface ClientForm {
  name: string;
  cpf: string;
  rg: string;
  occupation: string;
  address: string;
  income: number[];
  company: string[];
}

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<ClientForm>({
    name: "",
    cpf: "",
    rg: "",
    occupation: "",
    address: "",
    income: [],
    company: [],
  });

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then((res) => {
        const data = res.data as ClientForm;
        setForm({ ...data, income: data.income || [], company: data.company || [] });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncomeChange = (index: number, value: string) => {
    setForm((prev) => {
      const incomes = [...prev.income];
      incomes[index] = value === "" ? 0 : Number(value);
      return { ...prev, income: incomes };
    });
  };

  const addIncome = () => setForm((prev) => ({ ...prev, income: [...prev.income, 0] }));
  const removeIncome = (index: number) =>
    setForm((prev) => ({ ...prev, income: prev.income.filter((_, i) => i !== index) }));

  const handleCompanyChange = (index: number, value: string) => {
    setForm((prev) => {
      const companies = [...prev.company];
      companies[index] = value;
      return { ...prev, company: companies };
    });
  };

  const addCompany = () => setForm((prev) => ({ ...prev, company: [...prev.company, ""] }));
  const removeCompany = (index: number) =>
    setForm((prev) => ({ ...prev, company: prev.company.filter((_, i) => i !== index) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${id}`, form);
      alert("Cliente atualizado com sucesso!");
      router.push("/cliente/list");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar cliente!");
    }
  };

  return (
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#003366" }}>
          Editar Cliente
        </h2>

        {(["name", "cpf", "rg", "occupation", "address"] as const).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          />
        ))}

        {/* Income list */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#003366" }}>
            Rendas
          </label>
          {form.income.length === 0 && <div style={{ color: "#666", marginBottom: "0.5rem" }}>Nenhuma renda adicionada</div>}
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
              <button type="button" onClick={() => removeIncome(idx)} style={{ padding: "8px 12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={addIncome} style={{ padding: "8px 12px", backgroundColor: "#0077bb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            + Adicionar renda
          </button>
        </div>

        {/* Company list */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600, color: "#003366" }}>
            Empresas
          </label>
          {form.company.length === 0 && <div style={{ color: "#666", marginBottom: "0.5rem" }}>Nenhuma empresa adicionada</div>}
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
              <button type="button" onClick={() => removeCompany(idx)} style={{ padding: "8px 12px", backgroundColor: "#e74c3c", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={addCompany} style={{ padding: "8px 12px", backgroundColor: "#0077bb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            + Adicionar empresa
          </button>
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#003366", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
