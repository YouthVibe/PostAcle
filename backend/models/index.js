import mongoose from 'mongoose';

const indexSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  previewImage: {
    type: String,
    required: true
  },
  blogNumber: {
    type: Number,
    required: true,
    unique: true
  },
  blogID: {
    type: String,
    required: true,
    unique: true
  },
  wordsUsed: {
    type: Number,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  targetRegion: {
    type: String,
    required: true
  }
});

const Index = mongoose.model('Index', indexSchema);

export default Index;