import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Default icons for file types
const fileIcons = {
  pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png", // PDF icon
  video: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png", // Video icon
  image: "https://cdn-icons-png.flaticon.com/512/1829/1829586.png", // Image icon
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <p className="text-center text-gray-500">Loading course details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <p className="text-gray-700">{course.description}</p>

      {/* Course Materials Section */}
      <h3 className="text-lg font-semibold mt-6">Course Materials:</h3>
      <div className="mt-4 space-y-6">
        {course.materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded.</p>
        ) : (
          course.materials.map((file, index) => {
            let fileType = "image"; // Default to image
            if (file.url.endsWith(".pdf")) fileType = "pdf";
            else if (file.url.endsWith(".mp4")) fileType = "video";

            return (
              <div key={index} className="border p-4 rounded-md shadow-md bg-gray-100 flex items-center gap-4">
                {/* Display Default Icon Based on File Type */}
                <img src={fileIcons[fileType]} alt={`${fileType} icon`} className="w-12 h-12" />

                {/* File Details */}
                <div className="flex-1">
                  <p className="font-semibold">{file.url.split("/").pop()}</p>

                  {/* PDF Viewer */}
                  {fileType === "pdf" ? (
                    <iframe
                      src={`${file.url.replace("/upload/", "/upload/fl_attachment:raw/")}`}
                      title={`PDF ${index + 1}`}
                      className="w-full h-96 border mt-2"
                    />
                  ) : fileType === "video" ? (
                    <video controls className="w-full mt-2 rounded-lg">
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={file.url} alt="Uploaded Material" className="w-full h-auto rounded-lg shadow-md mt-2" />
                  )}

                  {/* Download Button */}
                  <a href={file.url} download className="block text-blue-500 mt-2 hover:underline">
                    📥 Download {fileType.toUpperCase()}
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
