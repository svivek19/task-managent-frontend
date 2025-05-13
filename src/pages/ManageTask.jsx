import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { assigneeTask, getTasksThunk } from "../redux/features/taskSlice";

const ManageTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role === "employee") {
      dispatch(assigneeTask(user?.email));
    } else {
      dispatch(getTasksThunk());
    }
  }, []);

  return (
    <div className="space-y-4">
      {loading ||
        (error && (
          <div className="bg-white p-4 rounded shadow-md">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        ))}
      <div>
        <TaskCard tasks={tasks} user={user} />
      </div>
    </div>
  );
};

export default ManageTask;
