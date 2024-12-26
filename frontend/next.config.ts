import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Requests starting with "/api" will be proxied
        destination: "http://localhost:6000/:path*", // Replace with your backend URL
      },
    ];
  },
};

export default nextConfig;
