import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UploadCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState(""); // ✅ Message state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔹 Redirect users if they are not logged in or not a teacher
  useEffect(() => {
    if (!token) {
      setMessage("❌ Error: You must be logged in to upload a course.");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
    } else if (role !== "teacher") {
      setMessage("❌ Error: Only teachers can upload courses.");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [token, role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before new upload
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
  
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }
  
    try {
      const token = localStorage.getItem("token"); // Ensure the token is available
      if (!token) {
        setMessage("❌ Error: User not logged in.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}` 
        }, // Do NOT set 'Content-Type', fetch will handle it
        body: formData, // ✅ Send FormData
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "❌ Failed to upload course");
      }
  
      setMessage("✅ Course uploaded successfully!");
      setTitle("");
      setDescription("");
      setFiles(null);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
      console.error("Upload Error:", error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Upload a Course</h2>
      {message && <p className="text-red-500">{message}</p>}
      {token && role === "teacher" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          <textarea placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="w-full border p-2 rounded-lg" />
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Upload Course</button>
        </form>
      ) : (
        <p className="text-gray-600">Redirecting...</p>
      )}
    </div>
  );
};

export default UploadCourse;
