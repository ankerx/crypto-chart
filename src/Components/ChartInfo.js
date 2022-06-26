import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
export const ChartInfo = ({ chartData, days }) => {
  return (
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
  );
};
