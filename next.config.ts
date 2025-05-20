import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },

};

export default nextConfig;