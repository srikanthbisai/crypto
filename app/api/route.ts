import { NextResponse, NextRequest } from "next/server";
import axios, { AxiosError } from "axios";

interface CoinbaseOrderBook {
  asks: [string, string][]; 
  bids: [string, string][]; 
  sequence: number; 
}

function formatPair(pair: string): string {
  if (pair.includes("-")) return pair; 
  return `${pair.slice(0, 3)}-${pair.slice(3)}`; 
}

async function getCoinbaseOrderBook(pair: string): Promise<CoinbaseOrderBook | null> {
  const url = `https://api.exchange.coinbase.com/products/${pair}/book?level=2`;

  try {
    const response = await axios.get<CoinbaseOrderBook>(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching Coinbase orderbook:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const rawPair = url.searchParams.get("pair") || "BTCUSD"; 
    const formattedPair = formatPair(rawPair); 

    const orderBook = await getCoinbaseOrderBook(formattedPair);

    if (!orderBook) {
      return NextResponse.json(
        { error: "Failed to fetch orderbook data from Coinbase API" },
        { status: 500 }
      );
    }

    const responseData = {
      asks: orderBook.asks.slice(0, 10), // Top 10 asks
      bids: orderBook.bids.slice(0, 10), // Top 10 bids
      spread: parseFloat(orderBook.asks[0][0]) - parseFloat(orderBook.bids[0][0]), 
    };

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("API Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }

    return NextResponse.json(
      { 
        error: `Error fetching data: ${(error instanceof Error ? error.message : "Unknown error")}` },
      { 
        status: 500
      }
    );
  }
}
