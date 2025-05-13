import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ priorityCount = {} }) => {
  const priorityCounts = {
    low: priorityCount["low"] || 0,
    medium: priorityCount["medium"] || 0,
    high: priorityCount["high"] || 0,
  };

  const maxValue = Math.max(
    priorityCounts.low,
    priorityCounts.medium,
    priorityCounts.high
  );

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Task Priority",
        data: [priorityCounts.low, priorityCounts.medium, priorityCounts.high],
        backgroundColor: [
          "rgb(34 197 94)",
          "rgb(249 115 22)",
          "rgb(239 68 68)",
        ],
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(4, maxValue + 1),
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
        Task Priority Levels
      </h2>
      <div className="relative w-full h-52">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
