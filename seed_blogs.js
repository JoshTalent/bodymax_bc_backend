import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";

// Load dotenv
dotenv.config();

const defaultBlogs = [};

seedDB();
