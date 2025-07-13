import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [new URL('https://www.post-acle.blog/images/**')],
    formats: ["image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200], // ✅ valid key
    imageSizes: [16, 32, 48, 64, 96],         // ✅ optional additional sizes
  },

};

export default nextConfig;
