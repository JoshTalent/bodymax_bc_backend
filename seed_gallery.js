import mongoose from "mongoose";
import dotenv from "dotenv";
import Gallery from "./models/Gallery.js";

// Load dotenv configuration
dotenv.config();

const defaultGalleryItems = [
  {
    id: 1,
    type: "image",
    category: "training",
    src: "https://i.postimg.cc/bJ318qSc/Screenshot_2026_03_01_174706.png",
    thumbnail: "https://i.postimg.cc/bJ318qSc/Screenshot_2026_03_01_174706.png",
    title: "Morning Boxing Fundamentals",
    description: "Members perfecting their technique in our 6 AM fundamentals class under professional guidance",
    date: new Date("2024-01-15"),
    views: 1242,
    likes: 89,
    comments: 23,
    tags: ["Training", "Beginners", "Technique", "Fundamentals"],
    featured: true,
    coach: "Coach David",
    location: "Main Ring",
    duration: "60 mins",
    equipment: ["Gloves", "Pads", "Mitts"],
    status: "published"
  },
  {
    id: 2,
    type: "image",
    category: "training",
    src: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    thumbnail: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    title: "High-Energy Fitness Class",
    description: "Boxing for Fitness class in full swing with intense cardio workout and professional coaching",
    date: new Date("2024-01-10"),
    views: 2856,
    likes: 156,
    comments: 42,
    tags: ["Cardio", "Workout", "Advanced", "Fitness", "HIIT"],
    featured: true,
    coach: "Coach Sarah",
    location: "Cardio Zone",
    duration: "45 mins",
    equipment: ["Heavy Bags", "Speed Bags"],
    status: "published"
  },
  {
    id: 3,
    type: "image",
    category: "training",
    src: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    thumbnail: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    title: "Kids Boxing Session",
    description: "Young champions learning discipline, technique, and sportsmanship in our youth program",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Beginners", "Community", "Training", "Youth", "Development"],
    featured: false,
    coach: "Coach Mike",
    location: "Kids Zone",
    duration: "45 mins",
    equipment: ["Junior Gloves", "Focus Mitts"],
    status: "published"
  },
  {
    id: 4,
    type: "image",
    category: "coach",
    src: "https://i.postimg.cc/FsT8qvnK/Screenshot_2026_03_01_171211.png",
    thumbnail: "https://i.postimg.cc/FsT8qvnK/Screenshot_2026_03_01_171211.png",
    title: "Elite Boxing Coach",
    description: "Professional coach with 15+ years experience training champions and national competitors",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Coach", "Professional", "Expert", "Training", "Mentor"],
    featured: false,
    coach: "Head Coach",
    location: "Coaching Area",
    duration: "Private",
    equipment: ["Professional Gear"],
    status: "published"
  },
  {
    id: 5,
    type: "image",
    category: "championship",
    src: "https://i.postimg.cc/zvvKG4Tg/Screenshot_2026_03_01_174742.png",
    thumbnail: "https://i.postimg.cc/zvvKG4Tg/Screenshot_2026_03_01_174742.png",
    title: "Universal Championship Victory",
    description: "Our champion celebrating victory at international boxing championship with gold medal",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Championship", "Competition", "Success", "Victory", "International"],
    featured: false,
    coach: "National Team",
    location: "International Arena",
    duration: "Championship",
    equipment: ["Competition Gloves"],
    status: "published"
  },
  {
    id: 6,
    type: "image",
    category: "championship",
    src: "https://i.postimg.cc/gJY3fxJM/Screenshot_2026_03_01_174534.png",
    thumbnail: "https://i.postimg.cc/gJY3fxJM/Screenshot_2026_03_01_174534.png",
    title: "IBA Championship Victory",
    description: "Our champion celebrating victory at international boxing championship with gold medal",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Championship", "Competition", "Success", "Victory", "International"],
    featured: true,
    coach: "National Team",
    location: "International Arena",
    duration: "Championship",
    equipment: ["Competition Gloves"],
    status: "published"
  },
  {
    id: 7,
    type: "image",
    category: "profile",
    src: "https://i.postimg.cc/DwmH3N9n/Screenshot_2026_03_01_170739.png",
    thumbnail: "https://i.postimg.cc/DwmH3N9n/Screenshot_2026_03_01_170739.png",
    title: "Valentin - National Champion",
    description: "Professional boxer with multiple national titles, awards, and international recognition",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Profile", "Boxer", "Athlete", "Champion", "Professional"],
    featured: false,
    coach: "Elite Training",
    location: "Competition Ring",
    duration: "Professional",
    equipment: ["Competition Gear"],
    status: "published"
  },
  {
    id: 8,
    type: "image",
    category: "profile",
    src: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    thumbnail: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    title: "Frank - Rising Star",
    description: "Young talent showing exceptional skills, dedication, and championship potential",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Profile", "Boxer", "Talent", "Rising Star", "Future"],
    featured: false,
    coach: "Development Program",
    location: "Training Ring",
    duration: "Development",
    equipment: ["Training Gear"],
    status: "published"
  },
  {
    id: 9,
    type: "image",
    category: "profile",
    src: "https://i.postimg.cc/wTwZPzb0/Screenshot_2026_03_01_170506.png",
    thumbnail: "https://i.postimg.cc/wTwZPzb0/Screenshot_2026_03_01_170506.png",
    title: "Our Heading Name",
    description: "Young talent showing exceptional skills, dedication, and championship potential",
    date: new Date("2024-01-12"),
    views: 1895,
    likes: 123,
    comments: 31,
    tags: ["Profile", "Boxer", "Talent", "Rising Star", "Future"],
    featured: false,
    coach: "Development Program",
    location: "Training Ring",
    duration: "Development",
    equipment: ["Training Gear"],
    status: "published"
  }
];

const seedGallery = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/BodyMax_BC";
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Connected successfully. Cleaning existing gallery items...");
    await Gallery.deleteMany({});
    console.log("Existing gallery items deleted.");

    console.log("Seeding premium default gallery items...");
    // Use insertMany but bypass pre('save') ID auto-increment to keep exact IDs 1-9
    await Gallery.insertMany(defaultGalleryItems);
    console.log("🎉 Database seeded successfully with 9 premium gallery items!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedGallery();
