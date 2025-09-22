"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  carro: string;
  data: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      // aqui faria uma chamada a API para buscar os pedidos
      setOrders([
        { id: 1, carro: "Honda Civic", data: "2025-09-21" },
        { id: 2, carro: "Toyota Corolla", data: "2025-09-20" },
      ]);
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Meus Pedidos</h1>
      <ul className="mt-4 space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="border p-2 rounded">
            {o.carro} - {o.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
