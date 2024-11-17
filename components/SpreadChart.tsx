import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ChartOptions,
  Legend
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface SpreadChartProps {
  data: number[];
}

const SpreadChart: React.FC<SpreadChartProps> = ({ data }) => {
  const [latestSpread, setLatestSpread] = useState<string>('');

  const chartData = {
    labels: Array(data.length).fill('').map((_, i) => i.toString()),
    datasets: [
      {
        label: 'Spread %',
        data: data.map(spread => (spread * 100).toFixed(4)),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(79, 70, 229)', 
        pointBorderColor: 'white', 
        pointRadius: 5, 
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `Spread: ${context.raw}%`, 
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Spread (%)',
        },
        ticks: {
          callback: (value) => `${value}%`, 
        },
      },
      x: {
        type: 'category' as const,
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  useEffect(() => {
    if (data.length > 0) {
     
      const latestSpreadValue = (data[data.length - 1] * 100).toFixed(4);
      setLatestSpread(latestSpreadValue);
    }
  }, [data]); 

  return (
    <div className="bg-black shadow-lg lg:p-6 flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 ">
      <div className="w-full lg:ml-10 max-md:h-[300px] lg:h-[500px] max-md:p-2 max-md:mt-32 lg:w-1/2 lg:p-4 rounded-lg bg-white">
        <Line data={chartData} options={options} />
      </div>

      <div className="w-full lg:w-1/2 p-4 rounded-lg font-serif text-white">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-500 lg:text-3xl">Spread Chart</h2>
        <p className="text-base mb-4">
          The spread chart visualizes the percentage difference between the bid and ask prices.
          The <strong className="text-pink-400">Spread</strong> is calculated as:
          ((Ask - Bid) / Ask) × 100%
        </p>
        <p className="text-base text-white mb-4">
          Typical spreads for BTC-USDT are usually below 0.1%. Values above 1% may indicate 
          unusual market conditions or low liquidity.
        </p>
        <div className="mt-4">
          <strong className="text-lg text-green-500">Latest Spread: </strong>
          <span className="text-xl font-bold text-red-500 font-serif">{latestSpread}%</span>
        </div>
      </div>
    </div>
  );
};

export default SpreadChart;
