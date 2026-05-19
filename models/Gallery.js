import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    type: {
      type: String,
      enum: ["image", "video"], // Add more types if needed
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      enum: ["training", "events", "classes", "facilities", "coaches", "coach", "championship", "profile"], // Add your categories
      required: [true, "Category is required"],
    },
    src: {
      type: String,
      required: [true, "Source URL is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    coach: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    equipment: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

// Auto-increment id (optional - if you want sequential IDs)
gallerySchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastItem = await mongoose.model("Gallery").findOne().sort({ id: -1 });
    this.id = lastItem ? lastItem.id + 1 : 1;
  }
  next();
});

// Index for better search performance
gallerySchema.index({ title: "text", description: "text", tags: "text" });
gallerySchema.index({ category: 1, status: 1, featured: 1 });
gallerySchema.index({ date: -1 }); // For sorting by date

// Virtual for formatted date (optional)
gallerySchema.virtual("formattedDate").get(function () {
  return this.date ? this.date.toISOString().split("T")[0] : null;
});

// Method to increment views
gallerySchema.methods.incrementViews = async function () {
  this.views += 1;
  return await this.save();
};

// Method to increment likes
gallerySchema.methods.incrementLikes = async function () {
  this.likes += 1;
  return await this.save();
};

// Method to increment comments
gallerySchema.methods.incrementComments = async function () {
  this.comments += 1;
  return await this.save();
};

// Static method to get featured items
gallerySchema.statics.getFeatured = function (limit = 10) {
  return this.find({ featured: true, status: "published" })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to get items by category
gallerySchema.statics.getByCategory = function (category, limit = 20) {
  return this.find({ category, status: "published" })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to search gallery
gallerySchema.statics.search = function (query, limit = 20) {
  return this.find(
    { $text: { $search: query }, status: "published" },
    { score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(limit);
};

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
