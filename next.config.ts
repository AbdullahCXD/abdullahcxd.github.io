import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: "export",

  basePath: "/portfolio",

  images: {
    unoptimized: true,
  },

  assetPrefix: "/portfolio/",

  trailingSlash: true,
};

export default nextConfig;
