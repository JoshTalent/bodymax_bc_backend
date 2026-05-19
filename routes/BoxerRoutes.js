import express from "express";
import Boxer from "../models/Boxer.js";

const router = express.Router();

// Create new boxer
router.post("/", async (req, res) => {
  try {
    const boxerData = req.body;
    const boxer = new Boxer(boxerData);
    await boxer.save();

    res.status(201).json({
      success: true,
      message: "Boxer profile created successfully",
      data: boxer,
    });
  } catch (error) {
    console.error("Create boxer error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all boxers with filters
router.get("/", async (req, res) => {
  try {
    const { category, search, status } = req.query;

    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { nickname: { $regex: search, $options: "i" } },
        { weight: { $regex: search, $options: "i" } },
        { hometown: { $regex: search, $options: "i" } },
      ];
    }

    const boxers = await Boxer.find(query).sort({ id: 1 });

    res.json({
      success: true,
      data: boxers,
    });
  } catch (error) {
    console.error("Get boxers error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single boxer profile
router.get("/:id", async (req, res) => {
  try {
    const boxer = await Boxer.findOne({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!boxer) {
      return res.status(404).json({
        success: false,
        message: "Boxer profile not found",
      });
    }

    res.json({
      success: true,
      data: boxer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update boxer profile
router.put("/:id", async (req, res) => {
  try {
    const boxer = await Boxer.findOneAndUpdate(
      {
        $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!boxer) {
      return res.status(404).json({
        success: false,
        message: "Boxer profile not found",
      });
    }

    res.json({
      success: true,
      message: "Boxer profile updated successfully",
      data: boxer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete boxer profile
router.delete("/:id", async (req, res) => {
  try {
    const boxer = await Boxer.findOneAndDelete({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!boxer) {
      return res.status(404).json({
        success: false,
        message: "Boxer profile not found",
      });
    }

    res.json({
      success: true,
      message: "Boxer profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
