import express from 'express';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import Blog from '../models/blog.js';
import Index from '../models/index.js';
import Best from '../models/best.js';

dotenv.config();

const router = express.Router();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const owner = 'YouthVibe';
const repo = 'PostAcle';
const basePath = 'post-acle/public';

// Helper function to get file SHA
async function getFileSha(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });
    return data.sha;
  } catch (error) {
    if (error.status === 404) {
      return null; // File not found
    }
    throw error;
  }
}

// Helper function to update or create file content
async function updateOrCreateFile(path, content, message) {
  const sha = await getFileSha(path);
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    sha: sha || undefined, // Only provide sha if updating
  });
}

router.get('/sync', async (req, res) => {
  try {
    // Sync index.json
    const indexData = await Index.find({});
    await updateOrCreateFile(
      `${basePath}/index.json`,
      JSON.stringify(indexData, null, 2),
      'Sync index.json from backend'
    );

    // Sync best.json
    const bestData = await Best.find({});
    await updateOrCreateFile(
      `${basePath}/best.json`,
      JSON.stringify(bestData, null, 2),
      'Sync best.json from backend'
    );

    // Sync individual blog files
    const allBlogs = await Blog.find({});
    for (const blog of allBlogs) {
      const blogFilePath = `${basePath}/blogs/${blog.blogID}.json`;
      await updateOrCreateFile(
        blogFilePath,
        JSON.stringify(blog, null, 2),
        `Sync blog ${blog.blogID}.json from backend`
      );
    }

    res.status(200).json({ message: 'GitHub repository synced successfully.' });
  } catch (error) {
    console.error('Error syncing with GitHub:', error);
    res.status(500).json({ message: 'Failed to sync with GitHub', error: error.message });
  }
});

export default router;