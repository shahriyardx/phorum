import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'robohash.org',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['lucide-react'],
}

export default nextConfig
