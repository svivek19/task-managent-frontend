import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import employeeSlice from "../features/employeeSlice";
import taskSlice from "../features/taskSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    employee: employeeSlice,
    task: taskSlice,
  },
});

export default store;
