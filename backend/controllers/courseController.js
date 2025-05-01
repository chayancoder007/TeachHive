import Course from "../models/courseModel.js";

// 📌 Create a New Course
export const createCourse = async (req, res) => {
  try {
    console.log("Received Course Data:", req.body); // ✅ Debugging Line
    console.log("Uploaded Files:", req.files); // ✅ Debugging Line for File Uploads

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // ✅ Ensure files are correctly processed
    const uploadedFiles = req.files.map((file) => ({
      url: file.path || file.location, // Use file.path (local) or file.location (Cloudinary)
    }));

    const newCourse = await Course.create({
      title,
      description,
      instructor: req.user._id, // Save instructor's ID
      materials: uploadedFiles, // ✅ Save files correctly
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error });
  }
};

// 📌 Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course", error });
  }
};

// 📌 Update Course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // ✅ Ensure only the instructor can update the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error });
  }
};

// 📌 Delete Course
// 📌 Delete Course (Only by the teacher who uploaded it)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // ✅ Ensure only the instructor can delete the course
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error });
  }
};

