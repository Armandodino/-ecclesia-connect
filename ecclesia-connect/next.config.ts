import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all dev origins (ngrok, localtunnel, cloudflare, etc.)
  allowedDevOrigins: [
    "https://*.ngrok-free.app",
    "https://*.ngrok.io",
    "https://*.loca.lt",
    "https://*.trycloudflare.com",
  ],

  // Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },

  // Disable strict mode to avoid double renders
  reactStrictMode: false,

  // Output standalone for deployment
  output: "standalone",

  // Headers for CORS and tunnel support
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
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' https: data: blob:; font-src 'self' https: data:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss: ws:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
