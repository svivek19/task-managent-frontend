import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  assigneeTask,
  clearTasks,
  getTasksThunk,
} from "../redux/features/taskSlice";

const ManageTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role === "employee") {
      dispatch(clearTasks());
      dispatch(assigneeTask(user?.email));
    } else {
      dispatch(getTasksThunk());
    }
  }, [dispatch, user]);

  return (
    <div className="space-y-4">
      {loading && (
        <div className="bg-white p-4 rounded shadow-md">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-white p-4 rounded shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && tasks && (
        <div>
          <TaskCard tasks={tasks} user={user} />
        </div>
      )}
    </div>
  );
};

export default ManageTask;
