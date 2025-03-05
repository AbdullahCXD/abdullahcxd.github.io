import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  /* config options here */

  output: "export",


  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
