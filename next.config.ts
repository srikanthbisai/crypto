import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Optional: Enables React's Strict Mode (helps with identifying potential issues in your app)
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL,  // Exposes the environment variable to your app
  },
};

export default nextConfig;
