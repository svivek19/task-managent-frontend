import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/features/userSlice";
import TaskCountElement from "../components/TaskCountElement";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarChart from "../components/charts/BarChart";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import {
  getTasksThunk,
  getRecentTask,
  assigneeTask,
  clearTasks,
} from "../redux/features/taskSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const { user } = useSelector((state) => state.user);
  const { tasks, loading, error, recentTask } = useSelector(
    (state) => state.task
  );

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

  useEffect(() => {
    dispatch(fetchCurrentUser);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(clearTasks());

      dispatch(getRecentTask());

      if (user.role === "employee") {
        dispatch(assigneeTask(user.email));
      } else {
        dispatch(getTasksThunk());
      }
    }
  }, [dispatch, user]);

  const taskStatuses = useMemo(() => {
    return tasks.map((task) => {
      const checklist = task.todoCheckList || [];

      const total = checklist.length;
      const completed = checklist.filter((item) => item?.isCompleted).length;

      if (completed === total && total > 0) return "Completed";
      if (completed === 0) return "Pending";
      return "InProgress";
    });
  }, [tasks]);

  const statusCount = useMemo(() => {
    return taskStatuses.reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }, [taskStatuses]);

  const priorityCount = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const priority = task.priority || "Unknown";
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});
  }, [tasks]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 capitalize flex items-center gap-2 flex-wrap">
              {getGreeting()}, {user?.fullName || "User"}
              {user?.role && (
                <span className="text-xs bg-blue-800 px-2 py-1 rounded-md text-white capitalize">
                  {user?.role}
                </span>
              )}
            </h1>
            <p className="text-gray-500 text-sm">{getFormattedDate(today)}</p>
          </div>
        </div>

        <TaskCountElement
          statusCount={statusCount}
          total={taskStatuses.length}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg w-full">
          <DoughnutChart statusCount={statusCount} />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg w-full">
          <BarChart priorityCount={priorityCount} />
        </div>
      </div>

      <div className="bg-white shadow-md p-4 space-y-2 rounded-lg">
        <div className="flex justify-between flex-wrap items-center gap-4">
          <h1 className="font-medium">Recent Tasks </h1>

          <Link to={`/${user?.role}/manage-task`}>
            <button className="flex items-center gap-2 border border-violet-500 rounded-md text-violet-700 px-2 py-1 cursor-pointer hover:bg-violet-50 transition-colors">
              See all{" "}
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                width="24"
                height="24"
              />
            </button>
          </Link>
        </div>

        <div>
          <TaskTable tasks={recentTask} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
