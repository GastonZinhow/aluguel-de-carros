import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Aluguel de Carros",
  description: "Gerencie aluguéis de carros de forma eficiente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
