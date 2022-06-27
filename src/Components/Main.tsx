import { Coin } from "./Coin";
import { useState, useEffect } from "react";
import { PagePagination } from "./PagePagination";
import axios from "axios";

type Coins = {
  id: string | undefined;
  name: string;
  image: string;
  current_price: string;
  price_change_percentage_24h: number;
  total_volume: string;
  market_cap: string;
  market_cap_rank: number;
  symbol: string;
};

function Main() {
  const [coinsData, setCoinsData] = useState<Coins[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [pageNumber, setPageNumber] = useState<number>(1);

  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=false`;

  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  const previousPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  const fetchCoinsData = async () => {
    try {
      const { data } = await axios.get(URL);
      setCoinsData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

  useEffect(() => {
    fetchCoinsData();
  }, [pageNumber, URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filteredCoins: Coins[] = coinsData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h3>Cryptocurrency prices sorted by market cap</h3>
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
            <tbody>
              {filteredCoins.map((coin, index) => {
                return (
                  <Coin
                    id={coin.id}
                    key={coin.id}
                    symbol={coin.symbol}
                    name={coin.name}
                    rank={coin.market_cap_rank}
                    index={index}
                    image={coin.image}
                    price={coin.current_price}
                    priceChange={coin.price_change_percentage_24h}
                    volume={coin.total_volume}
                    marketCap={coin.market_cap}
                  />
                );
              })}
            </tbody>
          </table>
          {filteredCoins.length === 0 && (
            <div>
              <p className="p">We couldn't find this coin</p>
            </div>
          )}
          <PagePagination
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </main>
    </div>
  );
}

export default Main;
