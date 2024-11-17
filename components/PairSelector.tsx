import React from "react";

interface PairSelectorProps {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
}

const PairSelector: React.FC<PairSelectorProps> = ({ selectedPair, setSelectedPair }) => {
  return (
    <div className=" text-black space-x-10 items-center  lg:ml-20 lg:mt-6 flex">
      <label htmlFor="pair" className="font-serif font-semibold text-3xl text-orange-500 ">
        Select Trading Pair
      </label>
      <select
        id="pair"
        className="border p-2 rounded text-lg font-serif text-green-800"
        value={selectedPair}
        onChange={(e) => setSelectedPair(e.target.value)}
      >
        <option value="BTCUSDT">BTC-USDT</option>
        <option value="ETHUSDT">ETH-USDT</option>
        <option value="XRPUSDT">XRP-USDT</option>
      </select>
    </div>
  );
};

export default PairSelector;
