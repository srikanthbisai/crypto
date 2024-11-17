import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDepthChartData } from '@/hooks/useDepthChartData';

export interface OrderEntry {
  price: number;
  volume: number;
}

export interface Orderbook {
  bids: OrderEntry[];
  asks: OrderEntry[];
}

interface DepthChartProps {
  orderbook: Orderbook | null;
}

const DepthChart: React.FC<DepthChartProps> = ({ orderbook }) => {
  const { midPrice, spreadPercentage, chartData, options } =
    useDepthChartData(orderbook);

  if (!orderbook) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white shadow-lg p-6 rounded-lg flex flex-col justify-center items-center lg:flex-row  lg:h-[600px] pt-20">
      <div className="w-full max-md:mt-32 lg:ml-10 h-full lg:w-1/2 bg-[#1a1f2b] max-md:p-2 lg:p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Depth Chart</h2>
        <div className="lg:h-[90%]">
          <Line data={chartData!} options={options!} />
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
        <h3 className="text-3xl font-serif font-semibold mb-4 text-yellow-500">Market Depth</h3>
        <p className="text-base mb-4 font-serif">
          The <strong>mid price</strong> is calculated as the average of the best bid and best ask prices. In this case, the mid price is{' '}
          <span className="text-green-400">{midPrice?.toFixed(3)} USDT</span>.
        </p>
        <p className="text-base mb-4 font-serif">
          The chart shows the cumulative volume of orders at each price level. The bids are shown on the left, while the asks are displayed on the right.
        </p>
        <p className="text-base mb-4 font-serif">
          The current spread between the best bid and the best ask is{' '}
          <span className="text-orange-500">{spreadPercentage?.toFixed(2)}%</span>.
        </p>
      </div>
    </div>
  );
};

export default DepthChart;
