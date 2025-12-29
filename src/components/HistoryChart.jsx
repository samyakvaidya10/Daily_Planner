import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function HistoryChart({ history }) {
  const labels = Object.keys(history);
  const data = labels.map(d => history[d].percent);

  if (!labels.length) return null;

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Daily Completion %",
            data
          }
        ]
      }}
    />
  );
}
