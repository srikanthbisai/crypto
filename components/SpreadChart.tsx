import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from "chart.js";
import useSpreadChartData from "../hooks/useSpreadChartData";

// Register components
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface SpreadChartProps {
  data: number[];
}

const SpreadChart: React.FC<SpreadChartProps> = ({ data }) => {
  const chartData = useSpreadChartData(data);

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8">
      {/* Chart */}
      <div className="w-full lg:w-1/2 p-4 rounded-lg">
        <Line data={chartData} />
      </div>

      {/* Explanation */}
      <div className="w-full lg:w-1/2 p-4 rounded-lg font-serif text-black ">
        <h2 className="text-2xl font-semibold mb-4">Spread Chart</h2>
        <p className="text-base mb-4">
          The spread chart visualizes the difference between the bid and ask prices for an asset.
          The <strong className="text-pink-400">Spread</strong> is the difference between the highest bid (buy order) and the lowest ask (sell order).
          This chart helps to understand the liquidity of the market and potential slippage.
        </p>
        <p className="text-base text-black mb-4">
          A smaller spread generally indicates better liquidity, while a larger spread may signal less liquidity, potentially causing slippage during trades.
        </p>
      </div>
    </div>
  );
};

export default SpreadChart;
