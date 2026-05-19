import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Create new blog post
router.post('/', async (req, res) => {
    try {
        const blogData = req.body;
        
        // Check if slug already exists
        if (blogData.slug) {
            const existingBlog = await Blog.findOne({ slug: blogData.slug });
            if (existingBlog) {
                return res.status(400).json({
                    success: false,
                    message: 'Blog post with this slug already exists'
                });
            }
        }
        
        const blog = new Blog(blogData);
        await blog.save();
        
        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all blog posts with filters
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            status, 
            featured, 
            search, 
            tags,
            author,
            sortBy = 'date',
            sortOrder = 'desc',
            page = 1, 
            limit = 10 
        } = req.query;

        // Build query
        const query = {};
        
        if (category) query.category = category;
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (tags) query.tags = { $in: tags.split(',') };
        if (author) query.author = author;

        let posts;
        let total;

        // Sort configuration
        const sortConfig = {};
        sortConfig[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Search functionality
        if (search) {
            posts = await Blog.search(search, parseInt(limit));
            total = await Blog.countDocuments({ 
                $text: { $search: search },
                ...query 
            });
        } else {
            // Regular query with pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            
            [posts, total] = await Promise.all([
                Blog.find(query)
                    .sort(sortConfig)
                    .skip(skip)
                    .limit(parseInt(limit)),
                Blog.countDocuments(query)
            ]);
        }

        res.json({
            success: true,
            data: posts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get featured posts
router.get('/featured', async (req, res) => {
    try {
        const limit = req.query.limit || 6;
        const posts = await Blog.getFeatured(parseInt(limit));
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get recent posts
router.get('/recent', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const posts = await Blog.getRecent(parseInt(limit));
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get popular posts
router.get('/popular', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const posts = await Blog.getPopular(parseInt(limit));
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// Update blog post
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { 
                $or: [
                    { _id: req.params.id },
                    { id: parseInt(req.params.id) },
                    { slug: req.params.id }
                ]
            },
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            $or: [
                { _id: req.params.id },
                { id: parseInt(req.params.id) },
                { slug: req.params.id }
            ]
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Increment likes
router.patch('/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findOne({
            $or: [
                { _id: req.params.id },
                { id: parseInt(req.params.id) },
                { slug: req.params.id }
            ]
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        await blog.incrementLikes();

        res.json({
            success: true,
            data: { likes: blog.likes }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


export default router;