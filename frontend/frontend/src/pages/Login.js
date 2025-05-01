import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setMessage("✅ Login Successful!");
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setMessage("❌ Login Failed: " + error.response.data.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/img/happy-graduate-student-gown-posing-white-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          padding: "24px",
          background: "rgba(255, 255, 255, 0.15)", // Glassmorphism effect
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
          borderRadius: "12px",
          backdropFilter: "blur(10px)", // Frosted glass effect
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          color: "#333", // Darker text for better readability
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: "#444" }}>Login</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#222",
              backdropFilter: "blur(5px)",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#222",
              backdropFilter: "blur(5px)",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "rgba(34, 197, 94, 0.8)",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(34, 197, 94, 1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(34, 197, 94, 0.8)")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
