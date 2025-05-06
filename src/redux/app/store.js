import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import employeeSlice from "../features/employeeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    employee: employeeSlice,
  },
});

export default store;
