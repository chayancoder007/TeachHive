# TeachHive
TeachHive - E-Learning MERN Web App . TeachHive is a powerful E-learning platform built with the MERN stack that allows teachers to upload courses with study materials (PDFs, videos, images) and students to explore, view, and download those resources. The UI is modern, responsive, and supports dark mode. Think of it like your own mini-YouTube.
🚀 Live Preview
Coming soon (host on Vercel for frontend & Render/Heroku for backend)

🧑‍💻 Tech Stack Used
Frontend	Backend	Cloud/File Storage
React.js	Node.js	Cloudinary (media uploads)
Tailwind CSS	Express.js	MongoDB Atlas
React Router DOM	Mongoose	JWT (auth)

🧩 Features
👨‍🏫 For Teachers:
Secure signup/login

Upload courses with PDF, images, or videos

View their own uploaded courses

Delete courses they created

Each course has thumbnail icons for file type

👩‍🎓 For Students:
Browse available courses

View PDFs in-browser, watch videos, and preview images

Download any material

Dark/light UI toggle support

🌐 General Features:
Responsive YouTube-style UI

Cloudinary integration for real-time file uploads
File-type detection & custom thumbnail icons
Protected routes: only logged-in users can upload or view courses
Clean navigation drawer with login/logout/signup logic

📁 Folder Structure (Simplified)
/frontend
  /src
    /components  # Navbar, CourseCard etc.
    /pages       # HomePage, CoursesPage, UploadCourse, Login, Signup
    index.css, App.js

/backend
  /controllers
  /routes
  /middleware
  /models
  .env
  server.js

🛠 How to Run Locally
Backend:
cd backend
npm install
# Add .env with MONGO_URI, CLOUDINARY keys, JWT_SECRET
npm start

Frontend:
cd frontend
npm install
npm start

🌟 What's Unique in This Project?
✅ Teachers can upload multiple file types to Cloudinary
✅ File previews based on type — images, PDFs (inline), videos
✅ Dynamic thumbnail icons
✅ Fully responsive YouTube-like interface
✅ Auth-protected routes for upload/view/delete
✅ Modern UI with Tailwind + dark mode
✅ Custom navbar drawer with logout logic

🔐 Environment Variables (.env)
Backend .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

Thank you ❤️❤️❤️
