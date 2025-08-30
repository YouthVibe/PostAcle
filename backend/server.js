// require('dotenv').config();
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import controllers
import * as db from './controllers/db.js';
import * as cloudinary from './controllers/cloudinary.js';
import * as gemini from './controllers/gemini.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import generateBlogRoutes from './routes/generateBlogRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://post-acle.blog';

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/generate', generateBlogRoutes);
app.use('/api/writer', writerRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origin: ${CLIENT_ORIGIN}`);
  try {
    await db.connect();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
});