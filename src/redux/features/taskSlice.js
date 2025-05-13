import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import { toast } from "sonner";

export const createTaskThunk = createAsyncThunk(
  "task/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/task/create", task);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Task creation failed";
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

  extraReducers: (builder) => {
    builder
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        toast.success("Task added successfully.");
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const {} = taskSlice.actions;

export default taskSlice.reducer;
