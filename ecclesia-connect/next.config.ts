import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow ngrok and external connections in dev
  allowedDevOrigins: [
    "https://*.ngrok-free.app",
    "https://*.ngrok.io",
  ],

  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.ngrok-free.app",
      },
    ],
  },

  // Headers for CORS
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
