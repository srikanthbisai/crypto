import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from "chart.js";

// Register components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface Orderbook {
  bids: { price: number; volume: number }[];
  asks: { price: number; volume: number }[];
}

const DepthChart = ({ orderbook }: { orderbook: Orderbook | null }) => {
  if (!orderbook) return <div>Loading...</div>;

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
        fill: false,
      },
      {
        label: "Asks",
        data: asks.map((a) => a.cumulativeVolume),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 text-black">
      <div className="w-full lg:w-1/2 p-4 rounded-lg">
        <Line data={chartData} />
      </div>
      <div className="w-full lg:w-1/2 p-4 rounded-lg text-black">
        <h2 className="text-2xl font-semibold mb-4">Market Depth Chart</h2>
        <p className="text-base mb-4">
          The market depth chart shows the supply and demand for an asset at various price levels. The <span className="text-blue-500">Bids</span> represent buy orders, while the <span className="text-blue-500">Asks</span> represent sell orders.
        </p>
        <p className="text-base mb-4">
          This chart helps visualize liquidity and potential price movements. It provides insights into support and resistance levels.
        </p>
      </div>
    </div>
  );
};

export default DepthChart;
