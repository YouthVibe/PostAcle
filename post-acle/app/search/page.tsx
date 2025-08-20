import React from 'react';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import FooterStatic from '../components/FooterStatic';
import SearchContent from './SearchContent.new';

export const metadata: Metadata = {
  title: `Search Blogs - PostAcle`, 
  description: `Search and find blogs on PostAcle. Discover articles on various topics.`,
  keywords: ['blogs', 'search', 'articles', 'PostAcle'],
  openGraph: {
    title: 'Search Blogs - PostAcle',
    description: `Search and find blogs on PostAcle. Discover articles on various topics.`,
    url: 'https://www.post-acle.blog/search',
    siteName: 'PostAcle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search Blogs - PostAcle',
    description: `Search and find blogs on PostAcle. Discover articles on various topics.`,
  },
};

export default function Search({ searchParams }: { searchParams: { q?: string; sort?: string; region?: string } }) {
  const { q, sort, region } = searchParams;

  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <Navbar />
      <SearchContent initialBlogs={[]} initialSearchQuery={q || ''} initialSort={sort || 'Newest'} initialRegion={region || 'Global'}/>
      <FooterStatic />
    </main>
  );
}
