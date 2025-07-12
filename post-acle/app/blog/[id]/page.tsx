import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface BlogJSON {
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  tags?: string[];
  author?: string;
  publishedDate?: string;
  wordsUsed?: number;
  targetRegion?: string;
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'blogs', `${params.id}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const blogData: BlogJSON = JSON.parse(fileContent);

    const tagsString = blogData.tags?.join(', ');
    const title = blogData.title || 'Blog';
    const description =
      blogData.previewDescription ||
      `Read ${title} by ${blogData.author || 'our author'} on PostAcle.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: blogData.previewImageURL || '/images/defaultBlog.jpg',
            width: 1200,
            height: 600,
            alt: title,
          },
        ],
        type: 'article',
        locale: 'en_US',
        publishedTime: blogData.publishedDate,
        authors: blogData.author ? [blogData.author] : undefined,
        tags: blogData.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [blogData.previewImageURL || '/images/defaultBlog.jpg'],
      },
      keywords: tagsString,
      metadataBase: new URL('https://postacle.blog'), // change this to your final domain
    };
  } catch (err) {
    console.error('Metadata error:', err);
    return {
      title: 'Blog Not Found',
      description: 'This blog post could not be loaded.',
    };
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  return <BlogPostClient id={params.id} />;
}
