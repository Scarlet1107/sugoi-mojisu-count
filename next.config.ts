import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/word-counter",
  assetPrefix: "/word-counter/",
  images: {
    path: "/word-counter/_next/image",
    loader: "default",
  },
};

export default nextConfig;
