import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // Enable static export
  images: {
    unoptimized: true, // Required for static export
    formats: ["image/webp"],
    sizes: [320, 420, 768, 1024, 1200], // Add this to fix the error
    deviceSizes: [320, 420, 768, 1024, 1200], // ✅ valid key
    imageSizes: [16, 32, 48, 64, 96],         // ✅ optional additional sizes
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
