import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AdminRoutes from "./routes/AdminRoutes.js";
import GalleryRoutes from "./routes/GalleryRoutes.js";
import BlogRoutes from "./routes/BlogRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import BoxerRoutes from "./routes/BoxerRoutes.js";
import EventRoutes from "./routes/EventRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables FIRST
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", AdminRoutes);
app.use("/api/gallery", GalleryRoutes);
app.use("/api/blog", BlogRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/boxers", BoxerRoutes);
app.use("/api/events", EventRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
