import Blog from '../models/blog.js';
import TempBlog from '../models/tempBlog.js';
import { generateBlogContent } from './gemini.js';

// Generate blog from raw text
export const generateBlog = async (req, res) => {
  try {
    const { rawText } = req.body;

    if (!rawText) {
      return res.status(400).json({ message: 'Raw text is required for blog generation.' });
    }

    // Call Gemini API to generate blog content (title, content, etc.)
    const generatedContent = await generateBlogContent(rawText);

    // Save the generated content as a temporary blog or directly as a draft
    const newTempBlog = new TempBlog({
      title: generatedContent.title || 'Untitled Blog',
      content: generatedContent.content || 'No content generated.',
      author: req.user.id, // Assuming user ID is available from authentication middleware
      // Add other fields as necessary, e.g., tags, categories, etc.
    });

    await newTempBlog.save();

    res.status(201).json({ message: 'Blog content generated and saved as draft successfully.', blog: newTempBlog });
  } catch (error) {
    console.error('Error generating blog:', error);
    res.status(500).json({ message: 'Server error during blog generation.' });
  }
};

// Modify existing blog
export const modifyBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, tags, categories, status } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    // Ensure only the author can modify their blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to modify this blog.' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.categories = categories || blog.categories;
    blog.status = status || blog.status; // e.g., 'draft', 'published', 'archived'

    await blog.save();

    res.status(200).json({ message: 'Blog updated successfully.', blog });
  } catch (error) {
    console.error('Error modifying blog:', error);
    res.status(500).json({ message: 'Server error during blog modification.' });
  }
};

// Get all blogs for a specific writer
export const getWriterBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching writer blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs.' });
  }
};