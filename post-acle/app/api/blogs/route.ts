import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('searchQuery') || '';
    const selectedCategory = searchParams.get('selectedCategory') || 'All';
    const selectedSort = searchParams.get('selectedSort') || 'Newest';
    const selectedRegion = searchParams.get('selectedRegion') || 'Global';
    const startIndex = parseInt(searchParams.get('startIndex') || '0', 10);
    const count = parseInt(searchParams.get('count') || '4', 10);

    const filePath = path.join(process.cwd(), 'public', 'index.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    let blogs: BlogEntry[] = JSON.parse(fileContent);

    // Deduplicate blogs based on blogID, as the client-side also does this
    const uniqueBlogIds = new Set<string>();
    const deduplicatedBlogs: BlogEntry[] = [];
    blogs.forEach(blog => {
      if (!uniqueBlogIds.has(blog.blogID)) {
        uniqueBlogIds.add(blog.blogID);
        deduplicatedBlogs.push(blog);
      }
    });
    blogs = deduplicatedBlogs;

    let filteredBlogs = blogs.filter(blog =>
      (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRegion === 'Global' || blog.targetRegion === selectedRegion)
    );

    if (selectedCategory !== 'All') {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory);
    }

    if (selectedSort === 'Newest') {
      filteredBlogs = filteredBlogs.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (selectedSort === 'Oldest') {
      filteredBlogs = filteredBlogs.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
    }

    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + count);

    return NextResponse.json({
      blogs: paginatedBlogs,
      totalCount: filteredBlogs.length,
      hasMore: (startIndex + count) < filteredBlogs.length,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}