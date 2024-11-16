import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL, 
  },
  output: "standalone", 
};

export default nextConfig;
