import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/save-the-date",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
