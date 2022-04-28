import React from "react";
import { useNavigate } from "react-router-dom";
function Coin({
  index,
  name,
  image,
  price,
  marketCap,
  volume,
  priceChange,
  symbol,
  id,
}) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr onClick={() => navigate(`/coindetails/${id}`)}>
        <th>{index + 1}</th>
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
}

export default Coin;
