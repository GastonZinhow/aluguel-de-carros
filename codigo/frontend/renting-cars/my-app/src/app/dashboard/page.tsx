"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header"; // Importando o Header

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-6 border border-gray-200">
    <div className="text-5xl text-[#003366]">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-[#003366]">{value}</p>
    </div>
  </div>
);

interface ActionCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  href,
  title,
  description,
  icon,
}) => (
  <Link
    href={href}
    className="block bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-transform duration-300 border border-gray-200 text-center"
  >
    <div
      className="text-5xl text-[#003366] mb-4"
      style={{ marginTop: "0.5rem" }}
    >
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-[#003366] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm" style={{ marginBottom: "0.5rem" }}>
      {description}
    </p>
  </Link>
);

export default function DashboardPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  return (
    <>
      <Header />
      <div
        className={`${poppins.className} min-h-screen bg-gradient-to-b from-[#d3d3d3] to-[#f5f5f5] flex flex-col`}
      >
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="max-w-lg w-full text-center bg-white py-8 px-10 rounded-2xl shadow-lg border border-gray-200 mb-12">
            <h1 className="text-4xl font-extrabold text-[#003366]">
              Dashboard
            </h1>
            <p className="text-base text-gray-700 mt-4">
              Bem-vindo de volta,{" "}
              <span className="font-semibold text-[#003366]">
                {username || "Usuário"}
              </span>{" "}
              👋
            </p>
          </div>
        </div>
        <div
          className="flex-4 flex flex-col justify-center items-center gap-y-12"
          style={{
            marginTop: "-8rem",
          }}
        >
          <div className="w-full max-w-6xl mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <StatCard title="Total de Pedidos" value="5" icon="📋" />
              <StatCard title="Contratos Ativos" value="2" icon="✍️" />
              <StatCard title="Veículos Cadastrados" value="8" icon="🚗" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#003366] my-14 text-center">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-10">
            <ActionCard
              href="/Pedido"
              title="Gerenciar Pedidos"
              description="Visualize e avalie os pedidos de aluguel."
              icon="📋"
            />
            <ActionCard
              href="/cliente/create"
              title="Gerenciar Clientes"
              description="Gerencie e cadastre os clientes."
              icon="🧑‍💼"
            />
            <ActionCard
              href="/Veiculo"
              title="Gerenciar Veículos"
              description="Cadastre e edite os automóveis."
              icon="🚗"
            />
            <ActionCard
              href="/profile"
              title="Editar Perfil"
              description="Atualize suas informações pessoais."
              icon="👤"
            />
          </div>
        </div>
      </div>
    </>
  );
}
