"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Header() {
  const pathname = usePathname();

  const excludedPaths = ["/auth/login", "/auth/register", "/"];
  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <header
      className={`${poppins.className} bg-[#003366] text-white shadow-md justify-items-center`}
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          Sistema de Aluguel
        </Link>

        <nav className="flex gap-6">
          <Link
            href="/dashboard"
            className={`hover:underline ${
              pathname === "/dashboard" ? "font-bold underline" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/Pedido/list"
            className={`hover:underline ${
              pathname === "/Pedido" ? "font-bold underline" : ""
            }`}
          >
            Pedidos
          </Link>
          <Link
            href="/cliente/list"
            className={`hover:underline ${
              pathname === "/cliente/list" ? "font-bold underline" : ""
            }`}
          >
            Clientes
          </Link>
          <Link
            href="/Veiculo/list"
            className={`hover:underline ${
              pathname === "/Veiculo" ? "font-bold underline" : ""
            }`}
          >
            Veículos
          </Link>
          <Link
            href="/profile"
            className={`hover:underline ${
              pathname === "/profile" ? "font-bold underline" : ""
            }`}
          >
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}
