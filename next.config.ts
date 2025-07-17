import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://assets.suitdev.com/storage/files/**'),
      new URL('https://placehold.co/**'),
    ],
  },
};

export default nextConfig;
