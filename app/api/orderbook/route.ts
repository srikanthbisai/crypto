// pages/api/orderbook.js (or .ts if using TypeScript)
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    console.log("Request URL:", request.url);
    console.log("BINANCE_API_URL:", process.env.BINANCE_API_URL);

    const url = new URL(request.url);
    const pair = url.searchParams.get("pair") || "BTCUSDT";

    const apiUrl = process.env.BINANCE_API_URL;
    if (!apiUrl) {
      console.error("BINANCE_API_URL is not set in environment variables.");
      return NextResponse.json(
        { error: "API URL not set in environment variables" },
        { status: 500 }
      );
    }

    console.log("Making request to:", `${apiUrl}?symbol=${pair}&limit=10`);
    const response = await axios.get(`${apiUrl}?symbol=${pair}&limit=10`);

    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to fetch data: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Enable Edge runtime
export const config = {
  runtime: 'edge', // This enables the edge function
};
