import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// 📌 Register User (Signup)
export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  return data;
};

// 📌 Login User
export const loginUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData);
  return data;
};
