import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const blogs = JSON.parse(fileContents);

    const titles = new Set<string>();
    const authors = new Set<string>();

    blogs.forEach((blog: any) => {
      titles.add(blog.title);
      authors.add(blog.author);
    });

    return NextResponse.json({ titles: Array.from(titles), authors: Array.from(authors) });
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    return NextResponse.json({ error: 'Failed to fetch autocomplete data' }, { status: 500 });
  }
}