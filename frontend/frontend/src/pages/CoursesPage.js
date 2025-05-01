import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const fileIcons = {
  pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
  video: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png",
  image: "https://cdn-icons-png.flaticon.com/512/1829/1829586.png",
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser); // Store logged-in user info

    fetchCourses();
  }, [navigate]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Course deleted successfully!");
        setCourses(courses.filter((course) => course._id !== courseId));
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Available Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (
          courses.map((course) => {
            let fileType = "image";
            if (course.materials?.length > 0) {
              const firstFile = course.materials[0].url;
              if (firstFile.endsWith(".pdf")) fileType = "pdf";
              else if (firstFile.endsWith(".mp4")) fileType = "video";
            }

            return (
              <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={fileIcons[fileType]} alt={`${fileType}`} className="w-full h-48 object-cover bg-gray-100 p-6" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-gray-600 text-sm">{course.description.slice(0, 80)}...</p>
                  <Link to={`/course/${course._id}`} className="block text-blue-500 mt-3 hover:underline">📖 View Course</Link>

                  {user && user._id === course.instructor && (
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
