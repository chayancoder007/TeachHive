import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage with Correct File Handling
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "auto"; // Default auto-detect

    if (file.mimetype.startsWith("video/")) {
      resourceType = "video"; // Store videos properly
    } else if (file.mimetype === "application/pdf") {
      resourceType = "raw"; // Store PDFs as raw (fixes PDF viewing issue)
    }

    return {
      folder: "teachhive_courses",
      format: file.mimetype.split("/")[1], // Preserve original format
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique filename to prevent conflicts
      resource_type: resourceType, // Set correct file type
    };
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

export default upload;
