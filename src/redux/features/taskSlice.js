import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import { toast } from "sonner";

export const createTaskThunk = createAsyncThunk(
  "task/createTask",
  async (task, { rejectWithValue, dispatch }) => {
    try {
      const response = await Axios.post("/task/create", task);
      toast.success("Task added successfully.");
      await dispatch(getTasksThunk());

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await Axios.patch("/task/update", {
        id,
        updatedState: taskData,
      });
      toast.success("Task updated successfully.");
      return response.data.task;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Task updation failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getTasksThunk = createAsyncThunk(
  "task/getTasks",
  async (token, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/task/get-all");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getRecentTask = createAsyncThunk(
  "task/getRecentTask",
  async (token, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/task/get-recent");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks";
      return rejectWithValue(errorMessage);
    }
  }
);

export const assigneeTask = createAsyncThunk(
  "task/assigneeTask",
  async (email, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/task/assignee/${email}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "task/getbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/task/get/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch task";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  "task/deleteTaskById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await Axios.delete("/task/delete/" + id);
      toast.success("Task deleted successfully.");
      await dispatch(getTasksThunk());
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete task";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    recentTask: [],
    currentTask: null,
    loading: false,
    error: null,
    token: localStorage.getItem("token") || null,
  },

  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assigneeTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tasks = [];
      })
      .addCase(assigneeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(assigneeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRecentTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentTask.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTask = action.payload;
      })
      .addCase(getRecentTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;

        const updatedTask = action.payload;

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        );
      })

      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
