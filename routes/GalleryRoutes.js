import express from "express";
import Gallery from "../models/Gallery.js";

const router = express.Router();

// Create new gallery item
router.post("/", async (req, res) => {
  try {
    const galleryData = req.body;

    const gallery = new Gallery(galleryData);
    await gallery.save();

    res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Create gallery error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all gallery items with filters
router.get("/", async (req, res) => {
  try {
    const {
      category,
      status,
      featured,
      search,
      tags,
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (featured) query.featured = featured === "true";
    if (tags) query.tags = { $in: tags.split(",") };

    let items;
    let total;

    // Search functionality
    if (search) {
      items = await Gallery.search(search, parseInt(limit));
      total = await Gallery.countDocuments({
        $text: { $search: search },
        ...query,
      });
    } else {
      // Regular query with pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      [items, total] = await Promise.all([
        Gallery.find(query)
          .sort({ date: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
        Gallery.countDocuments(query),
      ]);
    }

    res.json({
      success: true,
      data: items,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get gallery error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get featured items
router.get("/featured", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const items = await Gallery.getFeatured(parseInt(limit));

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single gallery item
router.get("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    // Increment views
    await gallery.incrementViews();

    res.json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update gallery item
router.put("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndUpdate(
      {
        $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      message: "Gallery item updated successfully",
      data: gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete gallery item
router.delete("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndDelete({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Increment likes
router.patch("/:id/like", async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    await gallery.incrementLikes();

    res.json({
      success: true,
      data: { likes: gallery.likes },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Increment comments count
router.patch("/:id/comment", async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      $or: [{ _id: req.params.id }, { id: parseInt(req.params.id) }],
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    await gallery.incrementComments();

    res.json({
      success: true,
      data: { comments: gallery.comments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const limit = req.query.limit || 20;

    const items = await Gallery.getByCategory(category, parseInt(limit));

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
