import React from "react";

interface PairSelectorProps {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
}

const PairSelector: React.FC<PairSelectorProps> = ({ selectedPair, setSelectedPair }) => {
  return (
    <div className=" text-black space-x-10 items-center  pl-3 lg:text-2xl flex">
      <label htmlFor="pair" className="font-serif font-semibold text-xl lg:text-3xl text-white">
        Select Trading Pair
      </label>
      <select
        id="pair"
        className="border p-2 rounded"
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
