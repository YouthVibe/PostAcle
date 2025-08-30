import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import Blog from '../models/blog.js';
import TempBlog from '../models/tempBlog.js';
import Index from '../models/index.js';
import Best from '../models/best.js';

// Get index blogs with limit
router.get('/index', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const blogs = await Index.find().limit(limit);
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching index blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get best blogs
router.get('/best', async (req, res) => {
  try {
    const blogs = await Best.find().limit(5); // Best only has 5 blogs
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching best blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific blog by blogID
router.get('/:blogID', async (req, res) => {
  try {
    const blog = await Blog.findOne({ blogID: req.params.blogID });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new blog (manager permission required)
router.post('/', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canUpdateBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can add blogs' });
  }
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    // Also add to index and best if applicable
    const newIndexEntry = new Index(req.body);
    await newIndexEntry.save();
    if (req.body.isBest) {
      const newBestEntry = new Best(req.body);
      await newBestEntry.save();
    }
    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Add a new temporary blog (writer permission required)
router.post('/temp', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canWriteTempBlog) {
    return res.status(403).json({ message: 'Forbidden: Only writers can add temporary blogs' });
  }
  try {
    const newTempBlog = new TempBlog(req.body);
    await newTempBlog.save();
    res.status(201).json({ message: 'Temporary blog added successfully', tempBlog: newTempBlog });
  } catch (error) {
    console.error('Error adding temporary blog:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Modify an existing blog (manager permission required)
router.put('/:blogID', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canEditBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can modify blogs' });
  }
  try {
    const updatedBlog = await Blog.findOneAndUpdate({ blogID: req.params.blogID }, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Update index and best as well
    await Index.findOneAndUpdate({ blogID: req.params.blogID }, req.body);
    if (req.body.isBest) {
      await Best.findOneAndUpdate({ blogID: req.params.blogID }, req.body);
    } else {
      await Best.findOneAndDelete({ blogID: req.params.blogID });
    }
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error modifying blog:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Delete a blog (manager permission required)
router.delete('/:blogID', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canDeleteBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can delete blogs' });
  }
  try {
    const deletedBlog = await Blog.findOneAndDelete({ blogID: req.params.blogID });
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Delete from index and best as well
    await Index.findOneAndDelete({ blogID: req.params.blogID });
    await Best.findOneAndDelete({ blogID: req.params.blogID });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Approve a temporary blog (manager permission required)
router.post('/approve/:blogID', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canApproveTempBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can approve temporary blogs' });
  }
  try {
    const tempBlog = await TempBlog.findOne({ blogID: req.params.blogID });
    if (!tempBlog) {
      return res.status(404).json({ message: 'Temporary blog not found' });
    }

    // Create a new permanent blog from the temporary one
    const newBlog = new Blog(tempBlog.toObject());
    await newBlog.save();

    // Add to index and best if applicable
    const newIndexEntry = new Index(tempBlog.toObject());
    await newIndexEntry.save();
    if (req.body.isBest) {
      const newBestEntry = new Best(tempBlog.toObject());
      await newBestEntry.save();
    }

    // Delete the temporary blog
    await TempBlog.findOneAndDelete({ blogID: req.params.blogID });

    res.status(200).json({ message: 'Temporary blog approved and moved to permanent blogs', blog: newBlog });
  } catch (error) {
    console.error('Error approving temporary blog:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// De-approve a blog (move from permanent to temporary) (manager permission required)
router.post('/deapprove/:blogID', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canDeApproveBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can de-approve blogs' });
  }
  try {
    const blog = await Blog.findOne({ blogID: req.params.blogID });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Create a new temporary blog from the permanent one
    const newTempBlog = new TempBlog(blog.toObject());
    newTempBlog.status = 'rejected'; // Or 'pending' based on desired flow
    await newTempBlog.save();

    // Delete the permanent blog from Blog, Index, and Best collections
    await Blog.findOneAndDelete({ blogID: req.params.blogID });
    await Index.findOneAndDelete({ blogID: req.params.blogID });
    await Best.findOneAndDelete({ blogID: req.params.blogID });

    res.status(200).json({ message: 'Blog de-approved and moved to temporary blogs', tempBlog: newTempBlog });
  } catch (error) {
    console.error('Error de-approving blog:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

export default router;