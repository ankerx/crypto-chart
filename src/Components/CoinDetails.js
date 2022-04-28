import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);

  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const historcalData = (id, days) => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  };

  // fetching all the coins data
  useEffect(() => {
    axios.get(url).then((res) => setCoin(res.data));
  }, [url]);

  // fetching historical data

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(historcalData(id, days));
      setChartData(data.prices);
    };
    fetchData();
  }, [days, id]);

  const handleClick = (e) => {
    setDays(e.target.value);
  };

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
            Twitter followers:{" "}
            {coin.community_data.twitter_followers.toLocaleString()}
          </p>
          <p>{coin.links.homepage[0]}</p>
          <div className="buttons">
            <button value={1} onClick={(e) => handleClick(e)}>
              1 day
            </button>
            <button value={30} onClick={(e) => handleClick(e)}>
              30 days
            </button>
            <button value={90} onClick={(e) => handleClick(e)}>
              90 days
            </button>
            <button value={365} onClick={(e) => handleClick(e)}>
              365 days
            </button>
          </div>
        </div>
      )}

      <div className="details-chart">
        {!chartData ? (
          <p>loading</p>
        ) : (
          <>
            <Line
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                responsive: true,
              }}
              data={{
                labels: chartData.map((coin) => {
                  const date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: chartData.map((coin) => coin[1]),
                    label: `Price from past ${days} ${
                      days > 1 ? "days" : "day"
                    } in USD`,
                    borderColor: "#3f51b5",
                  },
                ],
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CoinDetails;
