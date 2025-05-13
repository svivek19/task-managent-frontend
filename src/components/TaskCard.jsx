import React, { useState } from "react";
import ProgressBar from "./PregressBar";
import { formatDate } from "../services/format";
import AssigneeAvatars from "./AssigneeAvatars";
import { Icon } from "@iconify/react";
import { exportTasksToExcel } from "../services/exportToExcel";
import { Link } from "react-router-dom";

const TaskCard = ({ tasks, user }) => {
  const [filterStatus, setFilterStatus] = useState("All");

  if (!Array.isArray(tasks)) return null;

  const getStatusInfo = (todoCheckList) => {
    const total = todoCheckList?.length || 0;
    const completed = todoCheckList?.filter((t) => t.isCompleted).length || 0;

    if (total === 0) {
      return {
        status: "Pending",
        colorClass: "bg-orange-100 text-orange-700",
        borderColor: "border-orange-500",
      };
    } else if (completed === total) {
      return {
        status: "Completed",
        colorClass: "bg-green-100 text-green-700",
        borderColor: "border-green-500",
      };
    } else if (completed > 0) {
      return {
        status: "In Progress",
        colorClass: "bg-blue-100 text-blue-700",
        borderColor: "border-blue-500",
      };
    } else {
      return {
        status: "Pending",
        colorClass: "bg-orange-100 text-orange-700",
        borderColor: "border-orange-500",
      };
    }
  };

  const getPriorityColorClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const { status } = getStatusInfo(task.todoCheckList);
    return filterStatus === "All" || status === filterStatus;
  });

  const getTaskStatus = (todoCheckList) => {
    const total = todoCheckList?.length || 0;
    const completed = todoCheckList?.filter((t) => t.isCompleted).length || 0;

    if (total === 0) return "Pending";
    if (completed === total) return "Completed";
    if (completed > 0 && completed < total) return "In Progress";
    return "Pending";
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white p-4 shadow-md sticky top-0 z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="font-semibold text-lg">My Tasks</h1>

        <div className="flex flex-wrap gap-2 items-center">
          {["All", "Pending", "In Progress", "Completed"].map((status) => {
            const count =
              status === "All"
                ? tasks.length
                : tasks.filter(
                    (task) => getTaskStatus(task.todoCheckList) === status
                  ).length;

            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 font-medium rounded cursor-pointer ${
                  filterStatus === status
                    ? "text-blue-700 border-b-2 border-blue-500"
                    : "text-slate-700"
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
          {user?.role === "admin" && (
            <button
              onClick={() => exportTasksToExcel(tasks)}
              className="cursor-pointer bg-lime-100 px-3 py-1 rounded-md text-lime-700 font-medium hover:bg-lime-200 transition duration-300 flex items-center gap-2"
            >
              <Icon icon="file-icons:microsoft-excel" width="14" height="14" />
              Download Report
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 font-medium py-8">
              No tasks found
            </div>
          ) : (
            filteredTasks.map((task, idx) => {
              const { status, colorClass, borderColor } = getStatusInfo(
                task.todoCheckList
              );
              const priorityColorClass = getPriorityColorClass(task.priority);

              return (
                <Link
                  to={`/${user?.role}/manage-task/${task._id}`}
                  className="bg-white shadow-md rounded flex flex-col gap-2"
                  key={idx}
                >
                  <div className="flex gap-2 p-4">
                    <div
                      className={`${colorClass} px-2 py-1 rounded font-medium text-sm`}
                    >
                      {status}
                    </div>
                    <div
                      className={`${priorityColorClass} px-2 py-1 rounded font-medium text-sm capitalize`}
                    >
                      {task.priority} Priority
                    </div>
                  </div>

                  <div className={`border-l-2 ${borderColor} pl-4 pr-2`}>
                    <h1
                      className="text-lg font-semibold leading-relaxed line-clamp-1"
                      title={task.title}
                    >
                      {task.title}
                    </h1>
                    <p
                      className="text-slate-600 text-sm line-clamp-2"
                      title={task.description}
                    >
                      {task.description}
                    </p>
                    <div>
                      <ProgressBar todos={task.todoCheckList} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500">
                        Start Date
                      </p>
                      <h2 className="font-semibold text-xs text-slate-700">
                        {formatDate(task.createdAt)}
                      </h2>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500">
                        Due Date
                      </p>
                      <h2 className="font-semibold text-xs text-slate-700">
                        {formatDate(task.dueDate)}
                      </h2>
                    </div>
                  </div>

                  <div className="px-4 pb-2">
                    <AssigneeAvatars assignees={task.assignTo} />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
