import express from 'express';
import { Router } from 'express';
import { generateBlog, modifyBlog, getWriterBlogs } from '../controllers/writerController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// Protect writer routes with authentication middleware
router.use(authMiddleware);

// Generate blog from raw text
router.post('/generate-blog', generateBlog);

// Modify existing blog
router.put('/modify-blog/:blogId', modifyBlog);

// Get all blogs for the authenticated writer
router.get('/my-blogs', getWriterBlogs);

export default router;