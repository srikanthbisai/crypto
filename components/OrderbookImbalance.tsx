interface OrderbookImbalanceProps {
  imbalance: number | null;
}

const OrderbookImbalance = ({ imbalance }: OrderbookImbalanceProps) => {
  if (imbalance === null) return <div>Loading...</div>;

  const formattedImbalance = (imbalance * 100).toFixed(2); 

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 text-black lg:h-[600px]">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-6 lg:mb-0">
        <h2 className="text-2xl font-semibold mb-4">Orderbook Imbalance</h2>
        <p className="text-base mb-4">
          The orderbook imbalance represents the difference in order volumes between the bid and ask sides of the orderbook.
        </p>
        <p className="text-base mb-4">
          A positive imbalance indicates more bids than asks (buying pressure), while a negative imbalance indicates more asks than bids (selling pressure).
        </p>
      </div>
      <div className="w-full lg:w-1/2 bg-black rounded-lg p-10 text-center">
        <p className="text-3xl font-semibold text-orange-300 mb-4">Imbalance Value</p>
        <p
          className={`text-4xl font-semibold ${
            imbalance > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {formattedImbalance}%
        </p>
      </div>
    </div>
  );
};

export default OrderbookImbalance;
