import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { ChartInfo } from "./ChartInfo";
import { historcalData } from "../utils/api";

type Coin = {
  name: string;
  [key: string]: any;
};
function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState<Coin>();
  const [chartData, setChartData] = useState<Array<string>>();

  const [days, setDays] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const buttons: number[] = [1, 30, 90, 365];
  const URL = `https://api.coingecko.com/api/v3/coins/${id}`;

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(historcalData(id, days));
      setChartData(data.prices);
      setLoading(false);
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
  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(URL);
      setCoin(data);
      setLoading(false);
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
    fetchHistoricalData();
    fetchCoinData();
  }, [days, id, URL]);

  return (
    <div className="details-container">
      {coin && (
        <div className="details-info">
          {loading && <p>Loading...</p>}
          <div>
            <img src={coin.image.large} alt={coin.name} />
          </div>
          <h3>{coin.name}</h3>
          <p className="description">
            {parse(coin.description.en.split(". ")[0])}
          </p>
          <p>
            Current price ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p>
            Twitter followers:{" "}
            {coin.community_data.twitter_followers.toLocaleString()}
          </p>
          <a target="blank" href={coin.links.homepage[0]}>
            {coin.links.homepage[0]}
          </a>
          <div className="buttons">
            {buttons.map((btn, index) => {
              return (
                <button
                  key={btn}
                  onClick={() => {
                    setDays(btn);
                  }}
                >
                  {btn} day{index !== 0 && "s"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="details-chart">
        {!chartData ? (
          <p>loading...</p>
        ) : (
          <ChartInfo chartData={chartData} days={days} />
        )}
      </div>
    </div>
  );
}

export default CoinDetails;
