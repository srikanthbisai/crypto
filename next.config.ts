import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL, // Ensures the variable is accessible in your app
  },
  output: "standalone", 
};

export default nextConfig;
