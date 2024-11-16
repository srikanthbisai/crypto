import React from "react";

interface PairSelectorProps {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
}

const PairSelector: React.FC<PairSelectorProps> = ({ selectedPair, setSelectedPair }) => {
  return (
    <div className="m-4 text-black space-x-10 items-center justify-around">
      <label htmlFor="pair" className="text-2xl font-serif font-semibold text-white">
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
