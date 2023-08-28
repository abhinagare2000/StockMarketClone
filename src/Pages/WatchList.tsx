import { useState } from "react";

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);

  // Replace this with your actual stock list
  const initialStocks = [
    { symbol: "AAPL", price: null },
    { symbol: "GOOGL", price: null },
    { symbol: "MSFT", price: null },
  ];


  return (
    <div>
      <h2>Real-time Stock Watchlist</h2>
    </div>
  );
};

export default Watchlist;
