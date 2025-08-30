import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { generateBlogJson, searchPixabayImages, uploadImageToCloudinary } from '../controllers/blogGenerationController.js';
import TempBlog from '../models/tempBlog.js';

router.post('/generate', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canWriteTempBlog) {
    return res.status(403).json({ message: 'Forbidden: Only writers can generate temporary blogs' });
  }

  const { rawText } = req.body;

  if (!rawText) {
    return res.status(400).json({ message: 'Raw text is required for blog generation.' });
  }

  try {
    // 1. Generate blog JSON and image keywords using Gemini
    const { blogPost, imageKeywords } = await generateBlogJson(rawText);

    // 2. Search for images on Pixabay and upload to Cloudinary
    if (imageKeywords && imageKeywords.length > 0) {
      const pixabayHits = await searchPixabayImages(imageKeywords);
      if (pixabayHits && pixabayHits.length > 0) {
        // Take the first image as the preview image
        const previewImageUrl = pixabayHits[0].webformatURL;
        const cloudinaryPreviewUrl = await uploadImageToCloudinary(previewImageUrl);
        blogPost.previewImageURL = cloudinaryPreviewUrl;

        // Replace any image content in the blogPost with Cloudinary URLs
        for (let i = 0; i < blogPost.content.length; i++) {
          if (blogPost.content[i].contentType === 'image') {
            // For simplicity, we'll just use the first Pixabay image for all image content blocks
            // In a more complex scenario, you might want to map keywords to specific images
            blogPost.content[i].content = cloudinaryPreviewUrl;
          }
        }
      }
    }

    // 3. Save the generated blog to TempBlog collection
    const newTempBlog = new TempBlog(blogPost);
    await newTempBlog.save();

    res.status(201).json({ message: 'Temporary blog generated and saved successfully', tempBlog: newTempBlog });
  } catch (error) {
    console.error('Error in blog generation process:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

export default router;