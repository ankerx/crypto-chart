import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { ChartInfo } from "./ChartInfo";

type Coin = {
  name: string;
  [key: string]: any;
};
function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState<Coin>();
  const buttons: number[] = [1, 30, 90, 365];
  const [chartData, setChartData] = useState<Array<string>>();
  const [days, setDays] = useState<number>(1);

  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const historcalData = (id: string | undefined, days: number) => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  };

  useEffect(() => {
    axios.get(url).then((res) => setCoin(res.data));
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(historcalData(id, days));
      setChartData(data.prices);
    };
    fetchData();
  }, [days, id]);
  return (
    <div className="details-container">
      {coin && (
        <div className="details-info">
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
            Twitter followers:
            {coin.community_data.twitter_followers.toLocaleString()}
          </p>
          <p>{coin.links.homepage[0]}</p>
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
          <p>loading</p>
        ) : (
          <ChartInfo chartData={chartData} days={days} />
        )}
      </div>
    </div>
  );
}

export default CoinDetails;
