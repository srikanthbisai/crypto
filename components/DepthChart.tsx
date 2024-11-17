import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  TooltipItem,
  Scale,
  CoreScaleOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  annotationPlugin
);

interface OrderEntry {
  price: number;
  volume: number;
}

interface Orderbook {
  bids: OrderEntry[];
  asks: OrderEntry[];
}

interface DepthChartProps {
  orderbook: Orderbook | null;
}

const DepthChart: React.FC<DepthChartProps> = ({ orderbook }) => {
  if (!orderbook) return <div>Loading...</div>;

  const sortedBids = [...orderbook.bids].sort((a, b) => b.price - a.price);
  const sortedAsks = [...orderbook.asks].sort((a, b) => a.price - b.price);
  const midPrice = (sortedBids[0]?.price + sortedAsks[0]?.price) / 2;

  let bidCumulative = 0;
  const bidData = sortedBids.map((bid) => {
    bidCumulative += bid.volume;
    return {
      x: bid.price,
      y: bidCumulative,
    };
  });

  let askCumulative = 0;
  const askData = sortedAsks.map((ask) => {
    askCumulative += ask.volume;
    return {
      x: ask.price,
      y: askCumulative,
    };
  });

  const maxVolume = Math.max(bidCumulative, askCumulative);
  const spreadPercentage = ((sortedAsks[0]?.price - sortedBids[0]?.price) / sortedBids[0]?.price) * 100;

  const chartData = {
    datasets: [
      {
        label: 'Bids',
        data: bidData,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        fill: true,
        stepped: 'after' as const,
        tension: 0,
        pointRadius: 0,
        segment: {
          borderWidth: 1.5,
        },
        borderJoinStyle: 'miter' as const,
      },
      {
        label: 'Asks',
        data: askData,
        borderColor: '#FF5252',
        backgroundColor: 'rgba(255, 82, 82, 0.3)',
        fill: true,
        stepped: 'before' as const,
        tension: 0,
        pointRadius: 0,
        segment: {
          borderWidth: 1.5,
        },
        borderJoinStyle: 'miter' as const,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
    scales: {
      x: {
        type: 'linear' as const,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          maxRotation: 0,
        },
        border: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          callback: function(
            this: Scale<CoreScaleOptions>,
            tickValue: string | number
          ) {
            return typeof tickValue === 'number' 
              ? tickValue.toFixed(0)
              : parseFloat(tickValue).toFixed(0);
          },
          min: 0,
          max: maxVolume > 0 ? maxVolume * 1.2 : 100,
          stepSize: 10,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const label = context.dataset.label || '';
            const price = context.parsed.x.toFixed(3);
            const volume = context.parsed.y.toFixed(2);
            return `${label}: ${volume} at ${price} USDT`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
      },
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          midPriceLabel: {
            type: 'label',
            xValue: midPrice,
            yValue: maxVolume * 0.1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#FFD700',
            font: {
              weight: 'bold',
              size: 14,
            },
            content: `Mid Price: ${midPrice.toFixed(3)} USDT`,
            padding: {
              top: 10,
              left: 10,
              right: 10,
              bottom: 10,
            },
          },
        },
      },
    },
  } as const;

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-center items-center lg:flex-row text-black lg:h-[600px]">
      <div className="w-full h-full lg:w-1/2 bg-[#1a1f2b] max-md:p-2 lg:p-4 rounded-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Depth Chart</h2>
        <div className="lg:h-[90%]">
          <Line data={chartData} options={options} />
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
        <h3 className="text-3xl font-serif font-semibold mb-4">Market Depth</h3>
        <p className="text-base mb-4 font-serif">
          The <strong>mid price</strong> is calculated as the average of the best bid and best ask prices. In this case, the mid price is{' '}
          <span className="text-blue-400">{midPrice.toFixed(3)} USDT</span>.
        </p>
        <p className="text-base mb-4 font-serif">
          The market depth chart helps visualize the bids (buy orders) and asks (sell orders) in the market.
          A large gap between bids and asks can indicate potential price volatility, while a narrow gap suggests the market is balanced.
        </p>
        <p className="text-base mb-4 font-serif">
          The chart shows the cumulative volume of orders at each price level. The bids are shown on the left, while the asks are displayed on the right.
        </p>
        <p className="text-base mb-4 font-serif">
          The current spread between the best bid and the best ask is{' '}
          <span className="text-red-500">{spreadPercentage.toFixed(2)}%</span>.
        </p>
      </div>
    </div>
  );
};

export default DepthChart;
