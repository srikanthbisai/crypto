"use client";

import { useEffect, useState } from "react";
import OrderbookTable from "@/components/OrderbookTable";
import SpreadChart from "@/components/SpreadChart";
import OrderbookImbalance from "@/components/OrderbookImbalance";
import DepthChart from "@/components/DepthChart";
import axios from "axios";
import PairSelector from "@/components/PairSelector";

interface OrderbookEntry {
  price: number;
  volume: number;
}

interface Orderbook {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

const HomePage = () => {
  const [orderbook, setOrderbook] = useState<Orderbook | null>(null);
  const [spreadData, setSpreadData] = useState<number[]>([]);
  const [imbalance, setImbalance] = useState<number | null>(null);
  const [selectedPair, setSelectedPair] = useState<string>("BTCUSDT"); // Default pair

  const fetchOrderbook = async (pair: string) => {
    try {
      const response = await axios.get(`/api/orderbook?pair=${pair}`);
      const data = response.data;
  
      const bids = data.bids.map(([price, volume]: [string, string]) => ({
        price: parseFloat(price),
        volume: parseFloat(volume),
      }));
  
      const asks = data.asks.map(([price, volume]: [string, string]) => ({
        price: parseFloat(price),
        volume: parseFloat(volume),
      }));
  
      setOrderbook({ bids, asks });
  
      // Calculate spread and update the spread data
      if (bids.length > 0 && asks.length > 0) {
        const spread = asks[0].price - bids[0].price;
        setSpreadData((prev) => [...prev.slice(-59), spread]);
  
        // Calculate imbalance
        const bidVolume = bids.reduce((sum: number, item: OrderbookEntry) => sum + item.volume, 0);
        const askVolume = asks.reduce((sum: number, item: OrderbookEntry) => sum + item.volume, 0);
        setImbalance((bidVolume - askVolume) / (bidVolume + askVolume));
      }
    } catch (error) {
      console.error("Error fetching orderbook data:", error);
    }
  };
  
  useEffect(() => {
    fetchOrderbook(selectedPair);
    const interval = setInterval(() => fetchOrderbook(selectedPair), 1000);

    return () => clearInterval(interval);
  }, [selectedPair]);

  return (
    <div className="p-4 space-y-4">
      <PairSelector selectedPair={selectedPair} setSelectedPair={setSelectedPair} />

      {orderbook ? (
        <>
          <OrderbookTable orderbook={orderbook} />
          <SpreadChart data={spreadData} />
          <OrderbookImbalance imbalance={imbalance} />
          <DepthChart orderbook={orderbook} />
        </>
      ) : (
        <p>Loading orderbook...</p>
      )}
    </div>
  );
};

export default HomePage;
