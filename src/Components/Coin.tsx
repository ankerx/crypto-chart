import { useNavigate } from "react-router-dom";
type Props = {
  index: number;
  name: string;
  image: string;
  price: string;
  marketCap: string;
  rank: number;
  priceChange: number;
  volume: string;
  symbol: string;
  id: string | undefined;
};
export const Coin = ({
  name,
  image,
  price,
  marketCap,
  volume,
  priceChange,
  symbol,
  id,
  rank,
}: Props) => {
  const navigate = useNavigate();

  return (
    <tbody>
      <tr onClick={() => navigate(`/coindetails/${id}`)}>
        <th>{rank}</th>
        <td className="box">
          <img src={image} alt={`${name}`} />
          <div>
            <p className="symbol">{symbol.toUpperCase()}</p>
            <p className="name">{name}</p>
          </div>
        </td>
        <td>${price.toLocaleString()}</td>
        <td style={{ color: priceChange > 0 ? "green" : "red" }}>
          {priceChange.toFixed(2)}%
        </td>
        <td>${volume.toLocaleString()}</td>
        <td>${marketCap.toLocaleString()}</td>
      </tr>
    </tbody>
  );
};
