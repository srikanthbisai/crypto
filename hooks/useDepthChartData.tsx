import { useMemo } from "react";

interface OrderbookEntry {
  price: number;
  volume: number;
}

interface Orderbook {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
}

export const useDepthChartData = (orderbook: Orderbook) => {
  const { bids, asks, chartData } = useMemo(() => {
    const bids = orderbook.bids.reduce(
      (acc, { price, volume }) => {
        const cumulativeVolume = acc.cumulativeVolume + volume;
        acc.data.push({ price, cumulativeVolume });
        acc.cumulativeVolume = cumulativeVolume;
        return acc;
      },
      { data: [] as { price: number; cumulativeVolume: number }[], cumulativeVolume: 0 }
    ).data;

    const asks = orderbook.asks.reduce(
      (acc, { price, volume }) => {
        const cumulativeVolume = acc.cumulativeVolume + volume;
        acc.data.push({ price, cumulativeVolume });
        acc.cumulativeVolume = cumulativeVolume;
        return acc;
      },
      { data: [] as { price: number; cumulativeVolume: number }[], cumulativeVolume: 0 }
    ).data;

    const chartData = {
      labels: [...bids.map((b) => b.price), ...asks.map((a) => a.price)],
      datasets: [
        {
          label: "Bids",
          data: bids.map((b) => b.cumulativeVolume),
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Asks",
          data: asks.map((a) => a.cumulativeVolume),
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    };

    return { bids, asks, chartData };
  }, [orderbook]);

  return { bids, asks, chartData };
};
