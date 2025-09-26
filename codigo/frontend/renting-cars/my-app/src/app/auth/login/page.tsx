"use client";

import { useState } from "react";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      router.push("/dashboard");
    } catch (err) {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
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

      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          width: "500px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "#003366",
          }}
        >
          Login
        </h2>
        <input
          type="text"
          placeholder="Usuário"
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
          placeholder="Senha"
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
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "black",
          }}
        >
          Não tem uma conta?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            style={{
              color: "#003366",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  );
}
