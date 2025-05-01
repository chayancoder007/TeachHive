import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import UploadCourse from "./pages/UploadCourse";
import Signup from "./pages/Signup";  // ✅ Import Signup Page
import Login from "./pages/Login";    // ✅ Import Login Page
import CourseDetail from "./pages/CourseDetail"; // ✅ Import Course Detail Page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/upload" element={<UploadCourse />} />
        <Route path="/signup" element={<Signup />} />  {/* ✅ Add Signup Route */}
        <Route path="/login" element={<Login />} />  {/* ✅ Ensure Login Route is here */}
        <Route path="/course/:id" element={<CourseDetail />} /> {/* ✅ Add Course Details Route */}
      </Routes>
    </Router>
  );
};

export default App;
