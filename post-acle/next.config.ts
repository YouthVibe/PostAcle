/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allow HTTPS protocol
        hostname: '**', // Wildcard to allow all hostnames
      },
      {
        protocol: 'http', // Optionally allow HTTP if needed
        hostname: '**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

export default nextConfig;