import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/tasks/tasks";
import userReducer from "./features/user/user";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
  },
});
