import React, { useState } from "react";
import { createCourse } from "../api/courseApi";

const CourseForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    try {
      await createCourse(formData, token);
      setMessage("Course uploaded successfully!");
      setTitle("");
      setDescription("");
      setFiles(null);
    } catch (error) {
      setMessage("Failed to upload course");
    }
  };

  return (
    <div>
      <h2>Upload a Course</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
        <button type="submit">Upload Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
