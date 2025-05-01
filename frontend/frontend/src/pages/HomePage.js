import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-indigo-200 to-white flex flex-col items-center">
      {/* Navigation (Optional) */}

      {/* Hero Section */}
      <div className="max-w-5xl mt-16 text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Let's <span className="text-indigo-600">E-learning</span> at your home with <br/>
          <br/>
          <span className="text-indigo-600">TeachHive</span>
        </h1>
        <p className="text-gray-600 mt-4">
        “I am always ready to learn although I do not always like being taught.” 
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          
          <Link to="/courses" className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 transition">View Courses</Link>
          <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-full shadow-md hover:bg-indigo-100 transition">
            Read More
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mt-12 w-full flex justify-center">
      <img
        src="/img/happy-graduate-student-gown-posing-white-background.jpg"
       alt="E-learning"
       className="w-3/4 max-w-lg rounded-3xl shadow-lg"
      />

      </div>

      {/* Social Icons */}
      <div className="absolute bottom-8 left-8 flex gap-3">
        {/* <a href="#" className="text-indigo-600 hover:text-indigo-800 text-2xl">
          🌐
        </a>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-2xl">
          📘
        </a>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-2xl">
          🐦
        </a> */}
      </div>

      {/* Chat Button */}
      <div className="absolute bottom-8 right-8">
        <button className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
          💬
        </button>
      </div>
    </div>
  );
};

export default HomePage;
