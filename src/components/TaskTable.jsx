import React, { useState } from "react";
import { formatDate } from "../services/format";

const TaskTable = ({ tasks, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="text-center text-red-500"> {error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 text-nowrap">
                    S. No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 text-nowrap">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 text-nowrap">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 text-nowrap">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedTasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {(currentPage - 1) * tasksPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-nowrap">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`capitalize font-medium rounded-md px-2 py-1 inline-block w-fit
                          ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                              ? "bg-violet-100 text-violet-800"
                              : task.priority === "low"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {task.priority || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-nowrap">
                      {task.dueDate ? formatDate(task.dueDate) : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4 gap-2 items-center text-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer px-3 py-1 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer px-3 py-1 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskTable;
