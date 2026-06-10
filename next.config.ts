import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cqzzyxygdkdwpyzksbls.supabase.co",
      },
    ],
  },
};

export default nextConfig;