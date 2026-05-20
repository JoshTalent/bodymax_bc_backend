import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
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
    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["fight-night", "training-seminar", "club-event", "championship"],
      required: [true, "Category is required"],
      default: "fight-night",
    },
    status: {
      type: String,
      enum: ["published", "draft", "cancelled"],
      default: "published",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-increment sequential ID
eventSchema.pre("save", async function (next) {
  if (this.isNew && !this.id) {
    const lastItem = await mongoose.model("Event").findOne().sort({ id: -1 });
    this.id = lastItem ? lastItem.id + 1 : 1;
  }
  next();
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
