import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly set workspace root to silence multi-lockfile detection warning
    root: import.meta.dirname,
  },
};

export default nextConfig;
