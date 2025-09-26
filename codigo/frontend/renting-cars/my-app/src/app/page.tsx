"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import Footer from "@/app/components/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div
      className={`${poppins.className} min-h-screen flex flex-col`}
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8">
        <section className="text-center max-w-4xl">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "black" }}
          >
            Sistema de Aluguel de Carros
          </h1>
          <p
            className="text-lg sm:text-xl mb-12 px-4"
            style={{ color: "black" }}
          >
            Gerencie aluguéis de automóveis de forma simples e segura. Faça
            pedidos, acompanhe contratos e tenha controle total em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-12 justify-center mt-8">
            <Link
              href="/auth/register"
              className="bg-white w-48 sm:w-56 text-base sm:text-lg px-10 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow hover:shadow-lg"
              style={{ color: "#003366" }}
            >
              Criar Conta
            </Link>
            <Link
              href="/auth/login"
              className="text-white w-48 sm:w-56 text-base sm:text-lg px-10 py-4 rounded-lg font-semibold shadow transition-all duration-300 flex items-center justify-center hover:bg-blue-700"
              style={{ backgroundColor: "#003366" }}
            >
              Entrar
            </Link>
          </div>
        </section>
      </main>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
