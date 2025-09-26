"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import Header from "../components/Header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/auth/login");
    } else {
      setUsername(user);
    }

    // Carregar imagem do localStorage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    router.push("/auth/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = () => setProfileImage(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, selecione um arquivo PNG ou JPG.");
      }
    }
  };

  const handleSaveImage = () => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
      alert("Foto salva com sucesso!");
    } else {
      alert("Nenhuma foto selecionada.");
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
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Lado esquerdo - Foto */}
          <div style={{ textAlign: "center" }}>
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  border: "2px dashed #003366",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Perfil"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ color: "#003366" }}>Inserir Foto</span>
                )}
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* Botão de salvar foto */}
            <button
              onClick={handleSaveImage}
              style={{
                marginTop: "1rem",
                padding: "10px 20px",
                backgroundColor: "#003366",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Salvar Foto
            </button>
          </div>

          {/* Lado direito - Dados */}
          <div style={{ flex: 1 }}>
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "1rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              onClick={handleLogout}
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
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
