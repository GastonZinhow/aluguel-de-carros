"use client";

export default function Footer() {
return (
  <footer
    className="text-center text-sm sm:text-base py-4"
    style={{ color: "black" }}
  >
    <p>
      &copy; {new Date().getFullYear()} Sistema de Aluguel de Carros. Todos os
      direitos reservados.
    </p>
  </footer>
);
}