import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.alphamaverick.io',
      },
    ],
  },
};

export default nextConfig;
