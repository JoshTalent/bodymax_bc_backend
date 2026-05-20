import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";

// Load dotenv configuration
dotenv.config();

const defaultEvents = [
  {
    id: 1,
    title: "BodyMax Fight Night: Kigali Rumble",
    description: "Get ready for the most explosive fight night of the season! 10 action-packed amateur and professional bouts featuring BodyMax’s elite warriors going head-to-head with regional champions. Supported by elite coaches, come feel the high-octane atmosphere and support your favorite fighters under the spotlights.",
    date: new Date("2026-06-15"),
    time: "6:00 PM - 10:00 PM",
    location: "Main Ring, BodyMax Club, Kigali",
    image: "https://i.postimg.cc/zvvKG4Tg/Screenshot_2026_03_01_174742.png",
    category: "fight-night",
    status: "published",
    featured: true,
  },
  {
    id: 2,
    title: "Elite Boxing Technique Seminar",
    description: "Elevate your boxing IQ! Join our head coaches for a 3-hour masterclass detailing advanced counter-punching, subtle defensive head movement, and high-efficiency ring generalship. Open to intermediate and advanced practitioners looking to transition from raw fitness to fight-ready technical execution.",
    date: new Date("2026-07-04"),
    time: "10:00 AM - 1:00 PM",
    location: "Training Area, BodyMax Club",
    image: "https://i.postimg.cc/FsT8qvnK/Screenshot_2026_03_01_171211.png",
    category: "training-seminar",
    status: "published",
    featured: false,
  },
  {
    id: 3,
    title: "Summer Youth Boxing Tournament",
    description: "An exciting showcase of our youth program champions! Watch our junior fighters (ages 8-16) demonstrate outstanding discipline, technical precision, and athletic sportsmanship. Family-friendly event with awards, trophies, and certifications for all participants.",
    date: new Date("2026-08-12"),
    time: "9:00 AM - 3:00 PM",
    location: "Kids Zone & Main Ring, Kigali",
    image: "https://i.postimg.cc/wv6DS1vD/Screenshot_2026_03_01_174550.png",
    category: "championship",
    status: "published",
    featured: false,
  },
  {
    id: 4,
    title: "Spring Championship Showdown 2026",
    description: "A legendary night for BodyMax Boxing Club! Valentin secured the IBA Regional Super-Welterweight Title in a jaw-dropping 12-round unanimous decision. Relive the incredible atmosphere, packed stadium, and the absolute victory that brought another belt to the club.",
    date: new Date("2026-04-10"),
    time: "7:00 PM - 11:00 PM",
    location: "Kigali National Arena, Kigali",
    image: "https://i.postimg.cc/gJY3fxJM/Screenshot_2026_03_01_174534.png",
    category: "championship",
    status: "published",
    featured: true,
  },
  {
    id: 5,
    title: "Charity Sparring Gala",
    description: "Our annual community outreach sparring gala! Club members and local business owners stepped into the ring for exhibition bouts, successfully raising over 3,000,000 RWF for local youth sports development programs. A heartwarming and physically inspiring club night.",
    date: new Date("2026-03-15"),
    time: "5:00 PM - 8:00 PM",
    location: "Main Ring, BodyMax Club",
    image: "https://i.postimg.cc/bJ318qSc/Screenshot_2026_03_01_174706.png",
    category: "club-event",
    status: "published",
    featured: false,
  },
];

const seedEvents = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/BodyMax_BC";
    console.log("Connecting to MongoDB:", mongoUri);
    await mongoose.connect(mongoUri);

    console.log("Connected successfully. Cleaning existing event items...");
    await Event.deleteMany({});
    console.log("Existing event items deleted.");

    console.log("Seeding premium default events...");
    await Event.insertMany(defaultEvents);
    console.log("🎉 Database seeded successfully with 5 premium events!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedEvents();
