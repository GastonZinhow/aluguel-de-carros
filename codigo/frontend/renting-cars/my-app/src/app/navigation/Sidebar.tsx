"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type UserRole = "cliente" | "empresa" | "banco" | null;

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>("cliente"); 

  const baseLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/orders", label: "Pedidos" },
    { href: "/dashboard/contracts", label: "Contratos" },
    { href: "/dashboard/cars", label: "Automóveis" },
    { href: "/dashboard/profile", label: "Perfil" },
  ];

  const agentLinks = [
    { href: "/dashboard/orders", label: "Avaliar Pedidos" },
    { href: "/dashboard/contracts", label: "Gerenciar Contratos" },
    { href: "/dashboard/cars", label: "Automóveis" },
  ];

  const renderLinks = () => {
    if (role === "cliente") return baseLinks;
    if (role === "empresa" || role === "banco") return agentLinks;
    return [];
  };

  return (
    <aside className="h-screen w-64 bg-blue-700 text-white flex flex-col justify-between shadow-lg fixed left-0 top-0">
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
        🚗 CarRental
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-4">
        {renderLinks().map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-md transition ${
              pathname === link.href
                ? "bg-blue-500 font-semibold"
                : "hover:bg-blue-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-blue-500">
        <label className="text-sm block mb-2">Perfil:</label>
        <select
          className="text-black rounded w-full px-2 py-1"
          value={role ?? ""}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="cliente">Cliente</option>
          <option value="empresa">Empresa</option>
          <option value="banco">Banco</option>
        </select>
      </div>
    </aside>
  );
}