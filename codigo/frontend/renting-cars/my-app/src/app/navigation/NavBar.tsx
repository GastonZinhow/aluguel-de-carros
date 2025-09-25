"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type UserRole = "cliente" | "empresa" | "banco" | null;

export default function Navbar() {
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
  ];

  const renderLinks = () => {
    if (role === "cliente") return baseLinks;
    if (role === "empresa" || role === "banco")
      return [...agentLinks, { href: "/dashboard/cars", label: "Automóveis" }];
    return [];
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link href="/" className="text-xl font-bold">
        🚗 CarRental
      </Link>

      <div className="flex gap-6">
        {renderLinks().map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline ${
              pathname === link.href ? "font-semibold underline" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Perfil:</span>
        <select
          className="text-black rounded px-2 py-1"
          value={role ?? ""}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <option value="cliente">Cliente</option>
          <option value="empresa">Empresa</option>
          <option value="banco">Banco</option>
        </select>
      </div>
    </nav>
  );
}