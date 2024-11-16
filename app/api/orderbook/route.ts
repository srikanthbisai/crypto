import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    // Log the request URL and environment variable to debug the problem
    console.log("Request URL:", request.url);
    console.log("BINANCE_API_URL:", process.env.BINANCE_API_URL);

    const url = new URL(request.url);
    const pair = url.searchParams.get("pair") || "BTCUSDT";

    const apiUrl = process.env.BINANCE_API_URL;
    
    // Check if the API URL is available, log an error if it's not set
    if (!apiUrl) {
      console.error("BINANCE_API_URL is not set in environment variables.");
      return NextResponse.json(
        { error: "API URL not set in environment variables" },
        { status: 500 }
      );
    }

    // Make the API request and log the URL being requested
    console.log("Making request to:", `${apiUrl}?symbol=${pair}&limit=10`);
    const response = await axios.get(`${apiUrl}?symbol=${pair}&limit=10`);

    // Log the response data to ensure it's correct
    console.log("API Response:", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    // Log detailed error message to diagnose issues
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", errorMessage);
    return NextResponse.json(
      { error: `Failed to fetch data: ${errorMessage}` },
      { status: 500 }
    );
  }
}
