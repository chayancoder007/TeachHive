import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User,  Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">TeachHive</Link>

      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</Link>
        <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Courses</Link>
        <Link to="/upload" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Upload Course</Link>
        <input type="text" placeholder="Search" className="px-3 py-1 border rounded-md dark:bg-gray-800 dark:text-white" />

        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
         
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-lg z-50">
              {!token && <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>}
              {!token && <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign Up</Link>}
              {token && <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>}
            </div>
          )}
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="ml-2 text-gray-600 dark:text-gray-300">
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </nav>
  );
};

export default Navbar;
