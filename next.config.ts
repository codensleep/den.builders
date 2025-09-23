import type { NextConfig } from "next";

// Allow using a basePath only when explicitly provided.
// This keeps local dev available at "/" while enabling
// deployments under subpaths like "/den.builders".
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  ...(BASE_PATH ? { basePath: BASE_PATH, assetPrefix: BASE_PATH } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
