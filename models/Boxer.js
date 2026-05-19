import mongoose from "mongoose";

const boxerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: ["professional", "amateur"],
      required: [true, "Category (professional/amateur) is required"],
    },
    weight: {
      type: String,
      required: [true, "Weight class is required"],
      trim: true,
    },
    record: {
      type: String,
      required: [true, "Record is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    stats: {
      height: {
        type: String,
        trim: true,
        default: "",
      },
      reach: {
        type: String,
        trim: true,
        default: "",
      },
      age: {
        type: Number,
        default: 0,
      },
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    nationality: {
      type: String,
      trim: true,
      default: "",
    },
    hometown: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "retired", "draft"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// Auto-increment id
boxerSchema.pre("save", async function (next) {
  if (this.isNew && !this.id) {
    const lastItem = await mongoose.model("Boxer").findOne().sort({ id: -1 });
    this.id = lastItem ? lastItem.id + 1 : 1;
  }
  next();
});

const Boxer = mongoose.model("Boxer", boxerSchema);

export default Boxer;
