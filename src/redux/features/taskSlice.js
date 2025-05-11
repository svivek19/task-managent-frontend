import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
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
      });
  },
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;
