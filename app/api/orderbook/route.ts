import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pair = url.searchParams.get("pair") || "BTCUSDT";

    const response = await axios.get(
      `https://api.binance.com/api/v3/depth?symbol=${pair}&limit=10`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to fetch data: ${errorMessage}` }, { status: 500 });
  }
}
