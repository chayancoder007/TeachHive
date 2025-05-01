import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // ✅ Import Multer middleware

const router = express.Router();

// ✅ Course upload route (Only Teachers can upload courses)
router.post("/", protect, upload.array("files", 5), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);


export default router;
