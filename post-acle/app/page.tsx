import React from 'react';
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
