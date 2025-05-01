import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// Get all courses
export const getCourses = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Create a new course (For teachers)
export const createCourse = async (formData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.post(API_URL, formData, config);
  return data;
};
