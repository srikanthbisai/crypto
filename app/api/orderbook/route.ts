import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair") || "BTCUSDT";

    const apiUrl = process.env.BINANCE_API_URL;
    const response = await axios.get(`${apiUrl}?symbol=${pair}&limit=10`);
    

    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch data: ${errorMessage}` }, { status: 500 });
  }
}
