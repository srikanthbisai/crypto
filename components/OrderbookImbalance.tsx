interface OrderbookImbalanceProps {
  imbalance: number | null;
}

const OrderbookImbalance = ({ imbalance }: OrderbookImbalanceProps) => {
  if (imbalance === null) return <div>Loading...</div>;

  const formattedImbalance = (imbalance * 100).toFixed(2); 

  return (
    <div className="bg-black shadow-lg p-6 rounded-lg flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 text-black lg:h-[600px] font-serif">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-6 lg:mb-0 text-white lg:ml-16 max-md:mt-32">
        <h2 className="text-2xl font-bold font-serif  mb-4 text-yellow-500 lg:text-3xl">Orderbook Imbalance</h2>
        <p className="text-lg mb-4">
          The orderbook imbalance represents the difference in order volumes between the bid and ask sides of the orderbook.A positive imbalance indicates more bids than asks (buying pressure), while a negative imbalance indicates more asks than bids (selling pressure).
        </p>
      </div>
      <div className="w-full lg:w-1/2 bg-white rounded-lg p-10 text-center">
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
