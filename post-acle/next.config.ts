import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        port: '',
        pathname: '/**', // Allow all paths from pixabay.com
      },
    ],
  },
};

export default nextConfig;
