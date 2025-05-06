import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/Axios";

export const getAllEmployees = createAsyncThunk(
  "employee/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await Axios.get("/user/get-employee");

      return response.data?.reverse();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch employees";
      return rejectWithValue(errorMessage);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
