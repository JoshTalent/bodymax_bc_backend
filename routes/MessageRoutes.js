import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";

const router = express.Router();

// Create new contact message (Public)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, subject, message)",
      });
    }

    const newMessage = new Message({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
});

// Get all contact messages (Admin)
router.get("/", async (req, res) => {
  try {
    const {
      read,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filter by read status if provided
    if (read !== undefined && read !== "") {
      query.read = read === "true";
    }

    let messages;
    let total;

    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === "desc" ? -1 : 1;

    const limitVal = parseInt(limit);
    const skipVal = (parseInt(page) - 1) * limitVal;

    if (search) {
      // Perform text search if query exists
      query.$text = { $search: search };
      
      [messages, total] = await Promise.all([
        Message.find(query)
          .sort({ score: { $meta: "textScore" }, ...sortConfig })
          .skip(skipVal)
          .limit(limitVal),
        Message.countDocuments(query),
      ]);
    } else {
      [messages, total] = await Promise.all([
        Message.find(query)
          .sort(sortConfig)
          .skip(skipVal)
          .limit(limitVal),
        Message.countDocuments(query),
      ]);
    }

    res.json({
      success: true,
      data: messages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limitVal),
        totalItems: total,
        itemsPerPage: limitVal,
      },
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve messages",
    });
  }
});

// Update a message (e.g. mark as read/unread) (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { read } = req.body;
    const updateData = {};

    if (read !== undefined) {
      updateData.read = read;
    }

    // Support both MongoDB Object ID and auto-increment numerical ID
    const searchObj = {};
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      searchObj._id = req.params.id;
    } else if (!isNaN(req.params.id)) {
      searchObj.id = parseInt(req.params.id);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const message = await Message.findOneAndUpdate(
      searchObj,
      updateData,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: `Message marked as ${message.read ? "read" : "unread"}`,
      data: message,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update message",
    });
  }
});

// Delete a message (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const searchObj = {};
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      searchObj._id = req.params.id;
    } else if (!isNaN(req.params.id)) {
      searchObj.id = parseInt(req.params.id);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const message = await Message.findOneAndDelete(searchObj);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete message",
    });
  }
});

export default router;
