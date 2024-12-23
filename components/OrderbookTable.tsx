import React from 'react';

interface Orderbook {
  bids: { price: number; volume: number }[];
  asks: { price: number; volume: number }[];
}

const formatNumber = (num: number, decimals: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const OrderbookSkeleton = () => {
  return (
    <div className="bg-black shadow-lg sm:p-4 lg:p-6 rounded-lg flex flex-col justify-center items-center lg:flex-row text-white lg:pt-10">
      {/* Left Section - Overview */}
      <div className="w-full lg:w-1/2 max-md:mt-20 pr-0 lg:pr-8 mb-6 lg:mb-0 sm:p-10 lg:p-20">
        {/* Title Skeleton */}
        <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-4" />
        
        {/* Description Skeletons */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Insights Section */}
        <div className="mt-6 space-y-3">
          <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-40 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-40 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-44 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-44 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Right Section - Orderbook */}
      <div className="w-full lg:w-1/2 bg-[#1a1f2b] rounded-lg max-lg:p-4 lg:p-6">
        <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {/* Bids Column */}
          <div>
            <div className="h-6 w-20 bg-gray-800 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(8)].map((_, idx) => (
                <div key={`bid-${idx}`} className="grid grid-cols-2 gap-2">
                  <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Asks Column */}
          <div>
            <div className="h-6 w-20 bg-gray-800 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(8)].map((_, idx) => (
                <div key={`ask-${idx}`} className="grid grid-cols-2 gap-2">
                  <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OrderbookTableProps {
  orderbook: Orderbook | null;
  className?: string;
}

const OrderbookTable: React.FC<OrderbookTableProps> = ({ orderbook, className = '' }) => {
  if (!orderbook) return <OrderbookSkeleton />;

  const totalBidVolume = orderbook.bids.reduce((acc, item) => acc + item.volume, 0);
  const totalAskVolume = orderbook.asks.reduce((acc, item) => acc + item.volume, 0);

  const highestBid = Math.max(...orderbook.bids.map(item => item.price));
  const lowestAsk = Math.min(...orderbook.asks.map(item => item.price));

  return (
    <div className={`bg-black shadow-lg sm:p-4 lg:p-6 rounded-lg flex flex-col justify-center items-center lg:flex-row text-white lg:pt-10 ${className}`}>
      <div className="w-full lg:w-1/2 max-md:mt-20 pr-0 lg:pr-8 mb-6 lg:mb-0 sm:p-10 lg:p-20 font-serif">
        <h2 className="text-3xl font-serif font-semibold mb-4 text-yellow-500">Orderbook Overview</h2>
        <p className="text-base mb-4 font-serif">
          The orderbook displays the current bids and asks for a particular asset. The <span className="text-blue-400">Bids</span> represent buy orders, and the <span className="text-blue-400">Asks</span> represent sell orders.
        </p>
        <p className="text-base mb-4">
          This helps traders understand liquidity and potential support/resistance levels.
        </p>

        <div className="mt-6">
          <h4 className="text-xl font-semibold">Orderbook Insights</h4>
          <p className="text-base">
            <span className="text-blue-400">Highest Bid:</span> ${formatNumber(highestBid)}
          </p>
          <p className="text-base">
            <span className="text-red-400">Lowest Ask:</span> ${formatNumber(lowestAsk)}
          </p>
          <p className="text-base">
            <span className="text-green-400">Total Bid Volume:</span> {formatNumber(totalBidVolume, 4)} units
          </p>
          <p className="text-base">
            <span className="text-orange-400">Total Ask Volume:</span> {formatNumber(totalAskVolume, 4)} units
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#1a1f2b] rounded-lg max-lg:p-4 lg:p-6">
        <h3 className="font-semibold lg:text-xl mb-4 text-white">Orderbook</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-500 mb-2">Bids</h4>
            <div className="grid grid-cols-2 text-gray-500 text-xs lg:text-sm font-semibold mb-2">
              <span>Bid Price($)</span>
              <span>Volume</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {orderbook.bids.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 text-xs lg:text-sm text-gray-300 mb-2">
                  <span className="text-green-400">${formatNumber(item.price)}</span>
                  <span className="text-white font-mono hidden lg:block">{formatNumber(item.volume, 4)}</span>
                  <span className="text-white font-mono lg:hidden">{formatNumber(item.volume, 2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-500 mb-2">Asks</h4>
            <div className="grid grid-cols-2 text-gray-400 text-xs lg:text-sm font-semibold mb-2">
              <span>Ask Price($)</span>
              <span>Volume</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {orderbook.asks.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 text-xs lg:text-sm text-gray-300 mb-2">
                  <span className="text-red-400">${formatNumber(item.price)}</span>
                  <span className="text-white font-mono hidden lg:block">{formatNumber(item.volume, 4)}</span>
                  <span className="text-white font-mono lg:hidden">{formatNumber(item.volume, 2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderbookTable;