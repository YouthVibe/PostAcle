const express = require('express');
const router = express.Router();
const writerController = require('../controllers/writerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect writer routes with authentication middleware
router.use(authMiddleware);

// Generate blog from raw text
router.post('/generate-blog', writerController.generateBlog);

// Modify existing blog
router.put('/modify-blog/:blogId', writerController.modifyBlog);

// Get all blogs for the authenticated writer
router.get('/my-blogs', writerController.getWriterBlogs);

module.exports = router;