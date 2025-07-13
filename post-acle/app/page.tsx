import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PostAcle - AI-Powered Blogging Platform',
  description: 'Welcome to PostAcle, your smart AI-powered blogging platform. Discover trending blogs, create engaging content with AI assistance, and connect with a vibrant community of writers and readers.',
  keywords: ['PostAcle', 'AI blogging', 'blogging platform', 'content creation', 'AI tools', 'trending blogs', 'write with AI'],
  openGraph: {
    title: 'PostAcle - AI-Powered Blogging Platform',
    description: 'Welcome to PostAcle, your smart AI-powered blogging platform. Discover trending blogs, create engaging content with AI assistance, and connect with a vibrant community of writers and readers.',
    url: 'https://www.post-acle.blog',
    siteName: 'PostAcle',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PostAcle - AI-Powered Blogging Platform',
    description: 'Welcome to PostAcle, your smart AI-powered blogging platform. Discover trending blogs, create engaging content with AI assistance, and connect with a vibrant community of writers and readers.',
  },
};
import NavbarStatic from './components/NavbarStatic';
import HeroStatic from './components/HeroStatic';
import TrendingBlogs from './components/TrendingBlogs';
import FooterStatic from './components/FooterStatic';

export default function Home() {
  return (
    <main className="bg-[#0d0d1a] min-h-screen text-white font-sans">
      <NavbarStatic />
      <HeroStatic />
      <TrendingBlogs />
      <FooterStatic />
    </main>
  );
}
