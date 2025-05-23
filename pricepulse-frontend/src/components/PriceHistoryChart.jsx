import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function PriceHistoryChart({ data }) {
  if (!data || data.length === 0) return <p>No price history to show.</p>;

  // Prepare labels (dates) and prices
  const labels = data.map((item) => new Date(item.checkedAt));
  const prices = data.map((item) => item.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price (₹)",
        data: prices,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "PP p",
          displayFormats: {
            day: "MMM d",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (₹)",
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
