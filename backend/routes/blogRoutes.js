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

// Suggestion: More detailed error messages or a custom error handler
// Example (conceptual, requires implementation of custom error classes):
// } catch (error) {
//   console.error(`Error fetching index blogs: ${error.message}`, error.stack);
//   next(new CustomAPIError('Failed to fetch blogs', 500, 'BLOG_FETCH_ERROR'));
// }
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

router.post('/approve/:blogID', authMiddleware, async (req, res) => {
  if (!req.user.permissions.canApproveTempBlog) {
    return res.status(403).json({ message: 'Forbidden: Only managers can approve temporary blogs' });
  }

  try {
    const tempBlog = await TempBlog.findOne({ blogID: req.params.blogID });
    if (!tempBlog) {
      return res.status(404).json({ message: 'Temporary blog not found' });
    }

    // Convert tempBlog to object and clean
    const blogData = tempBlog.toObject();
    delete blogData._id; // let Mongo assign new one

    // --- Save to Blog ---
    const newBlog = await Blog.findOneAndUpdate(
      { blogID: blogData.blogID },
      blogData,
      { upsert: true, new: true }
    );

    // --- Save to Index (make sure required fields exist) ---
    const indexData = {
      blogID: blogData.blogID,
      title: blogData.title,
      blogNumber: blogData.blogNumber || req.body.blogNumber, // fallback from request
      previewImage: blogData.previewImage || req.body.previewImage,
      category: blogData.category || req.body.category
    };

    const newIndexEntry = await Index.findOneAndUpdate(
      { blogID: blogData.blogID },
      indexData,
      { upsert: true, new: true }
    );

    // --- Save to Best if applicable ---
    if (req.body.isBest) {
      const bestData = {
        blogID: blogData.blogID,
        title: blogData.title,
        previewImage: blogData.previewImage || req.body.previewImage,
        category: blogData.category || req.body.category
      };

      await Best.findOneAndUpdate(
        { blogID: blogData.blogID },
        bestData,
        { upsert: true, new: true }
      );
    }

    // --- Always delete from TempBlog ---
    await TempBlog.findOneAndDelete({ blogID: req.params.blogID });

    res.status(200).json({
      message: 'Temporary blog approved and moved to permanent collections',
      blog: newBlog,
      index: newIndexEntry
    });

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

// Get all blogs (both permanent and temporary - only owner can do this)
router.get('/all', authMiddleware, async (req, res) => {
  if (!req.user.permissions.isOwner) {
    return res.status(403).json({ message: 'Only owners can view all blogs' });
  }

  try {
    const permanentBlogs = await Blog.find({});
    const temporaryBlogs = await TempBlog.find({});
    const allBlogs = [...permanentBlogs, ...temporaryBlogs];
    res.status(200).json(allBlogs);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({ message: 'Error fetching all blogs', error: error.message });
  }
});

export default router;