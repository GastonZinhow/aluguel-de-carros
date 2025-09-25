import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 text-black px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        🚗 CarRental System
      </h1>
      <p className="text-lg md:text-xl mb-10 text-center max-w-2xl">
        Gerencie aluguéis de automóveis de forma simples e segura.
        Faça pedidos, acompanhe contratos e tenha controle total em um só lugar.
      </p>

      <div className="flex gap-6">
        <Link
          href="/auth/register"
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Criar Conta
        </Link>
        <Link
          href="/auth/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-400 transition"
        >
          Entrar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
        <div className="bg-white/10 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">📋 Pedidos</h2>
          <p>Crie, consulte e cancele pedidos de aluguel de forma prática.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">🏦 Avaliação</h2>
          <p>Agentes de bancos e empresas analisam pedidos em tempo real.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">⚡ Contratos</h2>
          <p>Associe contratos de crédito e gerencie os veículos alugados.</p>
        </div>
      </div>
    </main>
  );
}