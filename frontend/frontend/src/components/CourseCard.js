import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <img
        src={course.materials.length > 0 ? course.materials[0].url : "https://source.unsplash.com/400x250/?education,learning"}
        alt="Course Thumbnail"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.description.slice(0, 80)}...</p>
        <Link to={`/course/${course._id}`} className="text-red-500 hover:underline mt-2 block">
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
