import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async redirects() {
    return [
      { source: '/tahririye/:path*', destination: '/tahrirye/:path*', permanent: true },
      { source: '/editorial/:path*', destination: '/tahrirye/:path*', permanent: true },
    ]
  },
};

export default nextConfig;
