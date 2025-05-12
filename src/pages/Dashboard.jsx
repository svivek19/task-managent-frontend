import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/features/userSlice";
import { getTasksThunk } from "../redux/features/taskSlice";
import TaskCountElement from "../components/TaskCountElement";

const Dashboard = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const { user } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.task);

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

  const taskStatuses = tasks.map((task) => {
    const checklist = task.todoCheckList || [];

    const total = checklist.length;
    const completed = checklist.filter((item) => item.isCompleted).length;

    if (completed === total && total > 0) return "Completed";
    if (completed === 0) return "Pending";
    return "InProgress";
  });

  const statusCount = taskStatuses.reduce((acc, status) => {
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    dispatch(fetchCurrentUser);
    dispatch(getTasksThunk());
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <h1 className="text-xl font-semibold mb-1 capitalize inline-flex items-center gap-2">
        Good Morning, {user?.fullName || "User"}{" "}
        <p className="text-xs bg-blue-800 px-2 py-1 rounded-md text-white capitalize">
          {user?.role}
        </p>
      </h1>
      <p className="text-gray-500">{getFormattedDate(today)}</p>

      <div>
        <TaskCountElement
          statusCount={statusCount}
          total={taskStatuses.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
