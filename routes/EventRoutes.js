import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Create new event
router.post("/", async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all events with filters (search, category, status, timeFrame)
router.get("/", async (req, res) => {
  try {
    const { category, search, status, timeFrame } = req.query;

    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    // Search query matches title, description, location
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // Time frame filter: upcoming vs past
    if (timeFrame === "upcoming") {
      query.date = { $gte: new Date() };
    } else if (timeFrame === "past") {
      query.date = { $lt: new Date() };
    }

    // Sort by date: upcoming sorts chronologically closest, past sorts chronologically newest
    const sortField = timeFrame === "upcoming" ? { date: 1 } : { date: -1 };
    const events = await Event.find(query).sort(sortField);

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single event by id (Mongoose _id or sequential id)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) || -1 }],
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) || -1 }],
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) || -1 }],
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
