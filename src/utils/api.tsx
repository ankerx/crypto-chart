export const historcalData = (id: string | undefined, days: number) => {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
};
