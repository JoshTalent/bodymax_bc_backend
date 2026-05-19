import mongoose from "mongoose";
import dotenv from "dotenv";
import Boxer from "./models/Boxer.js";

// Load dotenv configuration
dotenv.config();

const defaultBoxers = [
  {
    id: 1,
    name: "Mike Rodriguez",
    nickname: "The Iron Giant",
    category: "professional",
    weight: "Heavyweight",
    record: "15-2-0 (12 KO)",
    image: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    stats: { height: "6'3\"", reach: '78"', age: 28 },
    bio: "A devastating power puncher with knockout power in both hands. Mike has dominated the heavyweight scene with raw strength and relentless pressure.",
    achievements: ["WBC Heavyweight Champion", "Golden Gloves Winner 2019"],
    nationality: "USA",
    hometown: "Brooklyn, NY",
    status: "active"
  },
  {
    id: 2,
    name: "Frank Kalisa",
    nickname: "Kigali Killa",
    category: "professional",
    weight: "Lightweight",
    record: "8-0-0 (6 KO)",
    image: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    stats: { height: "5'8\"", reach: '70"', age: 20 },
    bio: "Rwanda's undefeated rising star. Frank's speed and explosive counter-punching have made him the most feared prospect in East Africa.",
    achievements: ["National Pro Champion", "East African Series Winner"],
    nationality: "Rwanda",
    hometown: "Kigali",
    status: "active"
  },
  {
    id: 3,
    name: "James Brooks",
    nickname: "The Gentleman",
    category: "amateur",
    weight: "Middleweight",
    record: "48-4-0",
    image: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    stats: { height: "6'1\"", reach: '76"', age: 23 },
    bio: "A technical mastermind. James applies scientific precision to every exchange, earning his reputation as a master tactician.",
    achievements: ["National Elite Champion", "All-American 2022"],
    nationality: "USA",
    hometown: "Philadelphia",
    status: "active"
  },
  {
    id: 4,
    name: "Danny Martinez",
    nickname: "The Kid",
    category: "amateur",
    weight: "Light Flyweight",
    record: "26-2-0",
    image: "https://i.postimg.cc/gJY3fxJM/Screenshot_2026_03_01_174534.png",
    stats: { height: "5'2\"", reach: '62"', age: 17 },
    bio: "Young, hungry, and dangerously fast. Danny's work rate and technical foundation are well beyond his years.",
    achievements: ["Junior National Gold", "Regional MVP"],
    nationality: "USA",
    hometown: "Miami",
    status: "active"
  },
  {
    id: 5,
    name: "Abdul Havyarimana",
    nickname: "The Shadow",
    category: "amateur",
    weight: "Featherweight",
    record: "17-1-0",
    image: "https://i.postimg.cc/fyymR1YW/Screenshot_2026_03_01_174723.png",
    stats: { height: "5'5\"", reach: '66"', age: 19 },
    bio: "The featherweight division's most elusive target. Abdul's footwork and defensive mastery make him almost impossible to pin down.",
    achievements: ["African Youth Champion", "National Junior Gold"],
    nationality: "Rwanda",
    hometown: "Kigali",
    status: "active"
  }
];

const seedBoxers = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/BodyMax_BC";
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Connected successfully. Cleaning existing boxers list...");
    await Boxer.deleteMany({});
    console.log("Existing boxers deleted.");

    console.log("Seeding premium default boxers...");
    await Boxer.insertMany(defaultBoxers);
    console.log("🎉 Database seeded successfully with 5 elite boxer profiles!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedBoxers();
