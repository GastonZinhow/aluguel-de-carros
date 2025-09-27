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
      style={{
        background: "linear-gradient(135deg, #001b2e, #003366)",
        color: "#ffffff",
      }}
    >
      <main
        className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8"
        style={{
          paddingTop: "4rem",
          textAlign: "center",
        }}
      >
        <section
          className="text-center max-w-4xl"
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            marginBottom: "3rem",
            color: "#003366",
          }}
        >
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
            style={{
              marginBottom: "1.5rem",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Sistema de Aluguel de Carros
          </h1>
          <p
            className="text-lg sm:text-xl mb-12 px-4"
            style={{
              marginBottom: "2rem",
              lineHeight: "1.8",
            }}
          >
            Gerencie aluguéis de automóveis de forma simples e segura. Faça
            pedidos, acompanhe contratos e tenha controle total em um só lugar.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-12 justify-center mt-8"
            style={{
              marginTop: "2rem",
            }}
          >
            <Link
              href="/auth/register"
              className="bg-white w-48 sm:w-56 text-base sm:text-lg px-10 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow hover:shadow-lg"
              style={{
                color: "#003366",
                textAlign: "center",
                border: "2px solid #003366",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Criar Conta
            </Link>
            <Link
              href="/auth/login"
              className="text-white w-48 sm:w-56 text-base sm:text-lg px-10 py-4 rounded-lg font-semibold shadow transition-all duration-300 flex items-center justify-center hover:bg-blue-700"
              style={{
                backgroundColor: "#003366",
                textAlign: "center",
                border: "2px solid #ffffff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
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
