import React, { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../redux/features/taskSlice";

const ManageTask = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksThunk());
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
        <TaskCard tasks={tasks} />
      </div>
    </div>
  );
};

export default ManageTask;
