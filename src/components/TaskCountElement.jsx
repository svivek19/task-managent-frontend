import React from "react";

const TaskCountElement = ({ statusCount, total }) => {
  console.log(statusCount, total);
  return (
    <div>
      {" "}
      <ul className="flex justify-between flex-wrap gap-4 mt-4">
        <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
          {" "}
          <span className="bg-blue-500 py-3 px-1 rounded-full"></span>{" "}
          <span className="font-bold text-blue-500">{total || 0}</span> Total
          Tasks
        </li>
        <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
          {" "}
          <span className="bg-violet-500 py-3 px-1 rounded-full"></span>{" "}
          <span className="font-bold text-violet-500">
            {statusCount?.Pending || 0}
          </span>
          Pending Tasks
        </li>
        <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
          {" "}
          <span className="bg-sky-500 py-3 px-1 rounded-full"></span>
          <span className="font-bold text-sky-500">
            {statusCount?.InProgress || 0}
          </span>
          In Progress
        </li>
        <li className="text-slate-500 text-sm font-medium flex items-center gap-2">
          {" "}
          <span className="bg-green-500 py-3 px-1 rounded-full"></span>
          <span className="font-bold text-green-500">
            {statusCount?.Completed || 0}
          </span>
          Completed Tasks
        </li>
      </ul>
    </div>
  );
};

export default TaskCountElement;
