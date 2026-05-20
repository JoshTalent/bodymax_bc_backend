import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    category: {
      type: String,
      enum: [
        "fitness",
        "nutrition",
        "boxing",
        "training",
        "lifestyle",
        "beginners",
        "all",
        "technique",
        "success",
      ],
      required: [true, "Category is required"],
    },
    readTime: {
      type: String,
      required: [true, "Read time is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
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
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    metaKeywords: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Auto-increment id (optional - for sequential IDs)
blogSchema.pre("save", async function (next) {
  if (this.isNew && !this.id) {
    const lastItem = await mongoose.model("Blog").findOne().sort({ id: -1 });
    this.id = lastItem ? lastItem.id + 1 : 1;
  }
  next();
});

// Generate slug from title if not provided
blogSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

// Indexes for better search performance
blogSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  tags: "text",
});
blogSchema.index({ category: 1, status: 1, featured: 1 });
blogSchema.index({ date: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ likes: -1 });

// Virtual for formatted date
blogSchema.virtual("formattedDate").get(function () {
  return this.date ? this.date.toISOString().split("T")[0] : null;
});

// Virtual for URL-friendly date
blogSchema.virtual("url").get(function () {
  const date = this.date || new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `/blog/${year}/${month}/${day}/${this.slug}`;
});

// Method to increment views
blogSchema.methods.incrementViews = async function () {
  this.views += 1;
  return await this.save();
};

// Method to increment likes
blogSchema.methods.incrementLikes = async function () {
  this.likes += 1;
  return await this.save();
};

// Method to increment comments count
blogSchema.methods.incrementComments = async function () {
  this.comments += 1;
  return await this.save();
};

// Static method to get featured posts
blogSchema.statics.getFeatured = function (limit = 6) {
  return this.find({ featured: true, status: "published" })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to get recent posts
blogSchema.statics.getRecent = function (limit = 10) {
  return this.find({ status: "published" }).sort({ date: -1 }).limit(limit);
};

// Static method to get popular posts (by views)
blogSchema.statics.getPopular = function (limit = 10) {
  return this.find({ status: "published" })
    .sort({ views: -1, likes: -1 })
    .limit(limit);
};

// Static method to get posts by category
blogSchema.statics.getByCategory = function (category, limit = 10, skip = 0) {
  return this.find({ category, status: "published" })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
};

// Static method to search blog posts
blogSchema.statics.search = function (query, limit = 20) {
  return this.find(
    {
      $text: { $search: query },
      status: "published",
    },
    { score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(limit);
};

// Static method to get related posts (based on category and tags)
blogSchema.statics.getRelated = function (post, limit = 3) {
  return this.find({
    _id: { $ne: post._id },
    status: "published",
    $or: [{ category: post.category }, { tags: { $in: post.tags } }],
  })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to get archive by month
blogSchema.statics.getArchive = function () {
  return this.aggregate([
    { $match: { status: "published" } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        count: { $sum: 1 },
        posts: { $push: { title: "$title", slug: "$slug", date: "$date" } },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);
};

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
