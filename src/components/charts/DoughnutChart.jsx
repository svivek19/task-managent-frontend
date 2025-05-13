import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ statusCount = {} }) => {
  const statusCounts = {
    Pending: statusCount["Pending"] || 0,
    InProgress: statusCount["InProgress"] || 0,
    Completed: statusCount["Completed"] || 0,
  };

  const data = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Task Status",
        data: [
          statusCounts.Pending,
          statusCounts.InProgress,
          statusCounts.Completed,
        ],
        backgroundColor: [
          "rgb(139 92 246)",
          "rgb(14 165 233)",
          "rgb(74 222 128)",
        ],
        borderColor: ["rgb(139 92 246)", "rgb(14 165 233)", "rgb(74 222 128)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 20,
          color: "rgb(75, 85, 99)",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
        Task Distribution
      </h2>
      <div className="relative w-full h-52">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
