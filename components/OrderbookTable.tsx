interface Orderbook {
    bids: { price: number; volume: number }[];
    asks: { price: number; volume: number }[];
  }
  
  const OrderbookTable = ({ orderbook }: { orderbook: Orderbook | null }) => {
    if (!orderbook) return <div>Loading...</div>;
  
    return (
      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-center items-center lg:flex-row text-black">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Orderbook Overview</h2>
          <p className="text-base mb-4">
            The orderbook displays the current bids and asks for a particular asset. The <span className="text-blue-400">Bids</span> represent buy orders, and the <span className="text-blue-400">Asks</span> represent sell orders.
          </p>
          <p className="text-base mb-4">
            This helps traders understand liquidity and potential support/resistance levels.
          </p>
        </div>
        <div className="w-full lg:w-1/2 bg-black rounded-lg p-6">
          <h3 className="font-semibold text-xl mb-4 text-white">Orderbook</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-yellow-500 mb-2">Bids</h4>
              <div className="grid grid-cols-2 text-gray-500 text-sm font-semibold mb-2">
                <span>Bid Price</span>
                <span>Amount</span>
              </div>
              {orderbook.bids.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 text-sm text-gray-300 mb-2">
                  <span className="text-green-400">{item.price}</span>
                  <span className="text-white">{item.volume}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-yellow-500 mb-2">Asks</h4>
              <div className="grid grid-cols-2 text-gray-400 text-sm font-semibold mb-2">
                <span>Ask Price</span>
                <span>Amount</span>
              </div>
              {orderbook.asks.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 text-sm text-gray-300 mb-2">
                  <span className="text-red-400">{item.price}</span>
                  <span className="text-white">{item.volume}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderbookTable;
  