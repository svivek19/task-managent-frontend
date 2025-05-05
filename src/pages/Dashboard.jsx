import React from "react";

const Dashboard = () => {
  const today = new Date();

  function getFormattedDate(date) {
    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    const options = { weekday: "long", month: "long", year: "numeric" };
    const formattedParts = date.toLocaleDateString("en-GB", options).split(" ");

    const weekday = formattedParts[0].replace(",", "");
    const month = formattedParts[1];
    const year = formattedParts[2];

    return `${weekday}, ${day}${daySuffix} ${month} ${year}`;
  }

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h1 className="text-xl font-semibold mb-1">Good Morning, Vivek</h1>
      <p className="text-gray-500">{getFormattedDate(today)}</p>

      <div>
        <ul className="flex justify-between flex-wrap gap-4 mt-4">
          <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
            {" "}
            <span className="bg-blue-500 py-3 px-1 rounded-full"></span>{" "}
            <span className="font-bold text-blue-500">10</span> Total Tasks
          </li>
          <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
            {" "}
            <span className="bg-violet-500 py-3 px-1 rounded-full"></span>{" "}
            <span className="font-bold text-violet-500">15</span>
            Pending Tasks
          </li>
          <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
            {" "}
            <span className="bg-sky-500 py-3 px-1 rounded-full"></span>
            <span className="font-bold text-sky-500">38</span>
            In Progress
          </li>
          <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
            {" "}
            <span className="bg-green-500 py-3 px-1 rounded-full"></span>
            <span className="font-bold text-green-500">4</span>
            Completed Tasks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
