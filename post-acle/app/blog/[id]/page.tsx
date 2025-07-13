import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import NavbarStatic from '../../components/NavbarStatic';
import FooterStatic from '../../components/FooterStatic';
import BlogPostContent from './BlogPostContent';
// import BlogPostContent from './BlogPostClient';

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

export default function BlogPage({ params }: any) {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <NavbarStatic />
      <BlogPostContent id={params.id} />
      <FooterStatic />
    </main>
  );
}
