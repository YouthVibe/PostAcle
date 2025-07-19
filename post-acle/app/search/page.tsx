import React from 'react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const blogs = await getAllBlogs();
  const blogTitles = blogs.map(blog => blog.title).join(', ');

  return {
    title: `Search Blogs - PostAcle`, 
    description: `Search and find blogs on PostAcle. Discover articles on various topics including: ${blogTitles}.`,
    keywords: ['blogs', 'search', 'articles', 'PostAcle', ...blogs.flatMap(blog => blog.tags)],
    openGraph: {
      title: 'Search Blogs - PostAcle',
      description: `Search and find blogs on PostAcle. Discover articles on various topics including: ${blogTitles}.`,
      url: 'https://www.post-acle.blog/search',
      siteName: 'PostAcle',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Search Blogs - PostAcle',
      description: `Search and find blogs on PostAcle. Discover articles on various topics including: ${blogTitles}.`,
    },
  };
}
import fs from 'fs/promises';
import path from 'path';
import Navbar from '../components/Navbar';
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

export default async function Search({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const blogs = await getAllBlogs();
  
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <SearchContent initialBlogs={blogs} searchParams={searchParams} />
      <FooterStatic />
    </main>
  );
}
