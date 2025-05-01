import React, { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is student
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      setMessage("✅ Signup Successful! Please log in.");
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      setMessage("❌ Signup Failed: " + error.response.data.message);
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
          width: "500px", // Increased width for a rectangular shape
          padding: "32px",
          background: "rgba(255, 255, 255, 0.2)", // Glassmorphism effect
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
          borderRadius: "12px",
          backdropFilter: "blur(12px)", // Frosted glass effect
          border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
          color: "#333", // Darker text for better readability
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px", color: "#444" }}>Sign Up</h2>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              background: "white", // White background for better visibility
              color: "#000",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              background: "white", // White background for better visibility
              color: "#000",
              fontSize: "16px",
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
              padding: "12px",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              background: "white", // White background for better visibility
              color: "#000",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              background: "white", // White background for better visibility
              color: "#000",
              fontSize: "16px",
              outline: "none",
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "rgba(59, 130, 246, 0.8)", // Blue shade for signup button
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(59, 130, 246, 1)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "rgba(59, 130, 246, 0.8)")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
