// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import OrderbookTable from "@/components/OrderbookTable";
import SpreadChart from "@/components/SpreadChart";
import OrderbookImbalance from "@/components/OrderbookImbalance";
import DepthChart from "@/components/DepthChart";
import axios from "axios";
import PairSelector from "@/components/PairSelector"; 

const HomePage = () => {
  const [orderbook, setOrderbook] = useState<any>(null);
  const [spreadData, setSpreadData] = useState<number[]>([]);
  const [imbalance, setImbalance] = useState<number | null>(null);
  const [selectedPair, setSelectedPair] = useState<string>(""); // Default pair is BTCUSDT

  const fetchOrderbook = async (pair: string) => {
    try {
      const response = await axios.get(`/api/orderbook?pair=${pair}`);
      const data = response.data;

      const bids = data.bids.map((item: any) => ({
        price: parseFloat(item[0]),
        volume: parseFloat(item[1]),
      }));

      const asks = data.asks.map((item: any) => ({
        price: parseFloat(item[0]),
        volume: parseFloat(item[1]),
      }));

      setOrderbook({ bids, asks });

      const spread = asks[0].price - bids[0].price;
      setSpreadData((prev) => [...prev.slice(-59), spread]);

      const bidVolume = bids.reduce((sum, item) => sum + item.volume, 0);
      const askVolume = asks.reduce((sum, item) => sum + item.volume, 0);
      setImbalance((bidVolume - askVolume) / (bidVolume + askVolume));
    } catch (error) {
      console.error("Error fetching orderbook data", error);
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
