import React from "react";
import { Coin } from "./Coin";
import { useState, useEffect } from "react";

type Coins = {
  id: string | undefined;
  name: string;
  image: string;
  current_price: string;
  price_change_percentage_24h: number;
  total_volume: string;
  market_cap: string;
  symbol: string;
};

function Main() {
  const [coinsData, setCoinsData] = useState<Coins[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setCoinsData(data))
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filteredCoins: Coins[] = coinsData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(filteredCoins);
  return (
    <div className="container">
      <header className="header">
        <h3>Cryptocurrency Prices by Market Cap</h3>
        <form>
          <input
            type="text"
            placeholder="Search a cryptocurrency"
            onChange={handleChange}
          />
        </form>
      </header>
      <main>
        <div className="coin-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
              </tr>
            </thead>

            {filteredCoins.map((coin, index) => {
              return (
                <Coin
                  id={coin.id}
                  key={coin.id}
                  symbol={coin.symbol}
                  name={coin.name}
                  index={index}
                  image={coin.image}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  volume={coin.total_volume}
                  marketCap={coin.market_cap}
                />
              );
            })}
          </table>
        </div>
      </main>
    </div>
  );
}

export default Main;
