import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',  // Enable static exports
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        port: '',
        pathname: '/**', // Allow all paths from pixabay.com
      },
    ],
    unoptimized: true, // Required for static export
  },
  // Disable server-side features that aren't compatible with static export
  trailingSlash: true, // Better for static hosting
};

export default nextConfig;
