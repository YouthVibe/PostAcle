import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  previewDescription: {
    type: String,
    required: true
  },
  previewImageURL: {
    type: String,
    required: true
  },
  content: {
    type: Array,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  wordsUsed: {
    type: Number,
    required: true
  },
  targetRegion: {
    type: String,
    required: true
  },
  blogID: {
    type: String,
    required: true,
    unique: true
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;