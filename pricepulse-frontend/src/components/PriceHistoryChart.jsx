import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceHistoryChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No price history available.</p>;
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.checkedAt) - new Date(b.checkedAt)
  );

  const labels = sortedData.map((point) => {
    try {
      if (!point.checkedAt) throw new Error("Missing date");
      const parsedDate = new Date(point.checkedAt);
      if (isNaN(parsedDate)) throw new Error("Invalid date format");
      return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (err) {
      console.warn("Date parse error:", point.checkedAt);
      return "Invalid Date";
    }
  });

  const prices = sortedData.map((point) => point.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price (₹)",
        data: prices,
        fill: false,
        borderColor: "#7c3aed",
        backgroundColor: "#7c3aed",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4f46e5",
          font: {
            weight: "600",
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.y}`;
          },
        },
      },
      title: {
        display: false,
        text: "Price History",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4f46e5",
          maxRotation: 45,
          minRotation: 30,
          maxTicksLimit: 8,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#4f46e5",
          beginAtZero: false,
          callback: (value) => `₹${value}`,
        },
        grid: {
          borderDash: [5, 5],
          color: "#ddd",
        },
      },
    },
  };

  return (
    <div style={{ height: 180, width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceHistoryChart;
