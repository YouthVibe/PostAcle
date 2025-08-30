import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import Blog from './models/blog.js';
import Index from './models/index.js';
import Best from './models/best.js';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const publicPath = 'D:\\pro_projects\\PostAcle\\post-acle\\public';

async function addBlogData() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    // Clear existing data (optional, for fresh import)
    // await Blog.deleteMany({});
    // await Index.deleteMany({});
    // await Best.deleteMany({});
    // console.log('Cleared existing blog, index, and best data.');

    // Read index.json
    const indexPath = path.join(publicPath, 'index.json');
    const indexData = JSON.parse(await fs.readFile(indexPath, 'utf-8'));
    console.log(`Found ${indexData.length} entries in index.json.`);

    // Read best.json
    const bestPath = path.join(publicPath, 'best.json');
    const bestData = JSON.parse(await fs.readFile(bestPath, 'utf-8'));
    console.log(`Found ${bestData.length} entries in best.json.`);

    // Process individual blogs from public/blogs directory
    const blogsDirPath = path.join(publicPath, 'blogs');
    const blogFiles = await fs.readdir(blogsDirPath);
    const allBlogs = [];

    for (const file of blogFiles) {
      if (file.endsWith('.json')) {
        const blogFilePath = path.join(blogsDirPath, file);
        const blogContent = JSON.parse(await fs.readFile(blogFilePath, 'utf-8'));
        const blogID = path.basename(file, '.json'); // Extract blogID from filename
        allBlogs.push({ ...blogContent, blogID });
      }
    }
    console.log(`Found ${allBlogs.length} individual blog files.`);

    // Insert/Update Blogs
    for (const blog of allBlogs) {
      console.log(`Attempting to upsert Blog: ${blog.title} with blogID: ${blog.blogID}`);
      await Blog.findOneAndUpdate({ blogID: blog.blogID }, blog, { upsert: true, new: true });
      console.log(`Successfully upserted blog: ${blog.title}`);
    }

    // Insert/Update Index blogs
    for (const indexEntry of indexData) {
      console.log(`Attempting to upsert Index entry: ${indexEntry.title} with blogID: ${indexEntry.blogID}`);
      await Index.findOneAndUpdate({ blogID: indexEntry.blogID }, indexEntry, { upsert: true, new: true });
      console.log(`Successfully upserted index entry: ${indexEntry.title}`);
    }

    // Insert/Update Best blogs
    for (const bestEntry of bestData) {
      console.log(`Attempting to upsert Best entry: ${bestEntry.title} with blogID: ${bestEntry.blogID}`);
      await Best.findOneAndUpdate({ blogID: bestEntry.blogID }, bestEntry, { upsert: true, new: true });
      console.log(`Successfully upserted best entry: ${bestEntry.title}`);
    }

    console.log('All blog data successfully added/updated.');
  } catch (error) {
    console.error('Error adding blog data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

addBlogData();