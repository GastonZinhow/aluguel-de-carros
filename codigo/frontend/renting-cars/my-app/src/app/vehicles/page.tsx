"use client";

export default function CarsPage() {
  const cars = [
    { id: 1, modelo: "Honda Civic", preco: 200 },
    { id: 2, modelo: "Toyota Corolla", preco: 180 },
    { id: 3, modelo: "Fiat Argo", preco: 120 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Carros disponíveis</h1>
      <ul className="mt-4 space-y-2">
        {cars.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            {c.modelo} - R${c.preco}/dia
          </li>
        ))}
      </ul>
    </div>
  );
}
