import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared-element navigation between a product card and its case study.
  // Degrades to a normal navigation where unsupported, so there is no fallback
  // code to maintain.
  experimental: { viewTransition: true },
};

export default nextConfig;
