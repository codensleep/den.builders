import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: '/den.builders',
  assetPrefix: '/den.builders',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
