import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/z3rno-website",
  assetPrefix: "/z3rno-website",
  images: { unoptimized: true },
};

export default nextConfig;
