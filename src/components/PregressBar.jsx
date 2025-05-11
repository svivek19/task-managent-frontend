import React from "react";

const ProgressBar = ({ todos }) => {
  if (!todos || todos.length === 0) return null;

  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const totalCount = todos.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Dynamic color based on completion percentage
  const getColorClass = () => {
    if (percentage >= 100) return "bg-green-500"; // Completed
    if (percentage >= 75) return "bg-blue-500"; // Almost there
    if (percentage >= 50) return "bg-yellow-500"; // Halfway
    if (percentage >= 25) return "bg-orange-500"; // Started
    return "bg-red-500"; // Just beginning
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-700 text-sm">
          Task Done:{" "}
          <span className="font-semibold">
            {completedCount} / {totalCount}
          </span>
        </h3>
        <span
          className="text-sm font-medium"
          style={{
            color:
              percentage === 100
                ? "#10b981"
                : percentage >= 50
                ? "#3b82f6"
                : "#ef4444",
          }}
        >
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${getColorClass()} h-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
