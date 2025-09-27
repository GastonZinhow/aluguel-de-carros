"use client";

export default function Footer() {
return (
  <footer
    className="text-center text-sm sm:text-base py-4"
    style={{ color: "white", marginBottom: "1rem"}}
  >
    <p>
      &copy; {new Date().getFullYear()} Sistema de Aluguel de Carros. Todos os
      direitos reservados.
    </p>
  </footer>
);
}