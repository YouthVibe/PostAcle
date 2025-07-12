import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import NavbarStatic from '../components/NavbarStatic';
import FooterStatic from '../components/FooterStatic';
import SearchContent from './SearchContent';

interface BlogEntry {
  title: string;
  tags: string[];
  category: string;
  previewImage: string;
  blogNumber: number;
  blogID: string;
  wordsUsed: number;
  publishedDate: string;
  author: string;
  targetRegion: 'India' | 'US' | 'Europe' | 'Global';
}

// This function runs at build time to fetch all blog data
// export async function generateStaticProps() {
//   try {
//     const filePath = path.join(process.cwd(), 'public', 'index.json');
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     return JSON.parse(fileContent) as BlogEntry[];
//   } catch (error) {
//     console.error('Error reading blog index:', error);
//     return [];
//   }
// }

async function getAllBlogs(): Promise<BlogEntry[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as BlogEntry[];
  } catch (error) {
    console.error('Error reading blog index:', error);
    return [];
  }
}

export default async function Search() {
  const blogs = await getAllBlogs();
  
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <NavbarStatic />
      <SearchContent initialBlogs={blogs} />
      <FooterStatic />
    </main>
  );
}
