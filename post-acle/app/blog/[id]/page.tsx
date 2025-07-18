import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import FooterStatic from '../../components/FooterStatic';
import BlogPostContent from './BlogPostContent';

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

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'public', 'blogs'));
  return files.map((file) => ({
    id: file.replace('.json', ''),
  }));
}

export async function generateMetadata(
  { params }: any
): Promise<Metadata> {
  try {
    const { id } = params;
    const filePath = path.join(process.cwd(), 'public', 'blogs', `${id}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const blogData: BlogJSON = JSON.parse(fileContent);

    return {
      title: blogData.title,
      description: blogData.previewDescription,
      openGraph: {
        title: blogData.title,
        description: blogData.previewDescription,
        images: [
          {
            url: blogData.previewImageURL || 'https://www.post-acle.blog/images/defaultBlog.jpg',
            width: 1200,
            height: 600,
            alt: blogData.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: blogData.title,
        description: blogData.previewDescription,
        images: [blogData.previewImageURL || 'https://www.post-acle.blog/images/defaultBlog.jpg'],
      },
      metadataBase: new URL('https://www.post-acle.blog'),
    };
  } catch (err) {
    return {
      title: 'Blog Not Found',
      description: 'This blog post could not be loaded.',
    };
  }
}

interface BlogPageProps {
  params: { id: string };
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'blogs', `${id}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!Array.isArray(data.content)) {
      console.error('❌ Invalid content array:', data.content);
      return null;
    }

    // Parse charts and tables only if content is string
    data.content = data.content.map((block: any) => {
      if (
        (block.contentType === 'chart' || block.contentType === 'table')
      ) {
        if (typeof block.content === 'string') {
          try {
            block.content = JSON.parse(block.content);
          } catch (e) {
            console.warn('❌ Failed to parse JSON in chart/table block:', block);
            block.content = {};
          }
        } else if (typeof block.content !== 'object') {
          console.warn('❌ Unexpected content type (not object) in chart/table block:', block);
          block.content = {};
        }
      }
      return block;
    });

    return data;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}

interface BlogPost {
  title: string;
  previewDescription: string;
  previewImageURL?: string;
  content: any[];
  tags?: string[];
  author?: string;
  publishedDate?: string;
  wordsUsed?: number;
  targetRegion?: string;
}

export default async function BlogPage({ params }: any) {
  const blogPost = await getBlogPost(params.id);

  if (!blogPost) {
    return (
      <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
        <Navbar />
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <p className="text-white text-xl">Blog post not found or content is invalid.</p>
        </div>
        <FooterStatic />
      </main>
    );
  }

  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <BlogPostContent blogPost={blogPost} />
      <FooterStatic />
    </main>
  );
}
