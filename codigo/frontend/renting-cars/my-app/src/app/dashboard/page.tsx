"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-6">
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionCard = ({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) => (
  <Link
    href={href}
    className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-[#003366] mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Link>
);

export default function DashboardPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#d3d3d3] flex justify-center items-start py-12`}
    >
      <div className="w-full max-w-5xl space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#003366]">Dashboard</h1>
          <p className="text-lg text-gray-700 mt-2">
            Bem-vindo de volta,{" "}
            <span className="font-semibold text-[#003366]">
              {username || "Usuário"}
            </span>
            !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total de Pedidos" value="5" icon="📋" />
          <StatCard title="Contratos Ativos" value="2" icon="✍️" />
          <StatCard title="Veículos Cadastrados" value="8" icon="🚗" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#003366] mb-6 text-center">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionCard
              href="/Pedido" 
              title="Gerenciar Pedidos"
              description="Visualize e avalie os pedidos de aluguel."
              icon="📋"
            />
            <ActionCard
              href="/cliente/create" 
              title="Clientes"
              description="Gerencie e cadastre os clientes."
              icon="🧑‍💼"
            />
            <ActionCard
              href="/Veiculo" 
              title="Veículos"
              description="Cadastre e edite os automóveis da frota."
              icon="🚗"
            />
            <ActionCard
              href="/profile" 
              title="Editar Perfil"
              description="Atualize suas informações pessoais e de conta."
              icon="👤"
            />
          </div>
        </div>
      </div>
    </div>
  );
}