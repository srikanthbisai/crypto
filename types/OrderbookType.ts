type OrderbookEntry = {
    price: number;
    volume: number;
  };
  
  type Orderbook = {
    bids: OrderbookEntry[];
    asks: OrderbookEntry[];
  };
  