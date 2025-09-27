"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Header from "../components/Header";
import api from "@/utils/axios";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>();

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/auth/login");
    } else {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/auth/login");
  };

  const handlePasswordUpdate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await api.put(`/users/${userId}/password`, newPassword);
      setSuccessMessage("Senha atualizada com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar senha!");
    }
  };

  return (
    <>
      <Header></Header>
      <div
        className={poppins.className}
        style={{
          backgroundColor: "#d3d3d3",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "black",
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Sistema de Aluguel de Carros
        </h1>

        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            width: "700px",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "#003366",
            }}
          >
            Perfil
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "1.1rem",
            }}
          >
            Bem-vindo, <strong>{username}</strong>!
          </p>

          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Senha Atual"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handlePasswordUpdate}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#003366",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Atualizar Senha
          </button>

          {successMessage && (
            <p
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              {successMessage}
            </p>
          )}

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#DC2626",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
