"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser({ username: "mirelly", email: "mirelly@email.com" });
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Meu Perfil</h1>
      {user ? (
        <div className="mt-4">
          <p>Usuário: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
