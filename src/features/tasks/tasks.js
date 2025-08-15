import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  todayTasks: [],
};
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getStateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addStateTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateStateTasks: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );
      if (index != -1) state.tasks[index] = action.payload;
    },
    deleteStateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload
      );
      if (index != -1) {
        state.tasks.splice(index, 1);
      }
    },
    updateStateTaskStatus: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );
      if (index != -1) {
        state.tasks[index].completed = action.payload.status;
      }
    },
    // getStateTodayTasks: (state, action) => {
    //   state.todayTasks = action.payload;
    // },
    // deleteStateTodayTask: (state, action) => {
    //   const index = state.todayTasks.findIndex(
    //     (task) => task.taskId === action.payload
    //   );
    //   if (index != -1) {
    //     state.todayTasks.splice(index, 1);
    //   }
    // },
    // updateStateTodayTaskStatus: (state, action) => {
    //   const index = state.todayTasks.findIndex(
    //     (task) => task.taskId === action.payload.taskId
    //   );
    //   if (index != -1) {
    //     state.todayTasks[index].completed = action.payload.status;
    //   }
    // },
  },
});

export const {
  addStateTasks,
  deleteStateTask,
  // deleteStateTodayTask,
  getStateTasks,
  // getStateTodayTasks,
  updateStateTaskStatus,
  updateStateTasks,
  // updateStateTodayTaskStatus,
} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export const selectFilteredTasks = createSelector(
  [selectTasks, (_, status) => status],
  (tasks, status) => tasks.filter((task) => task.completed == status)
);
export const selectTodayTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter(
    (task) =>
      new Date(task.dateTime) >= new Date().setHours(0, 0, 0, 0) &&
      new Date(task.dateTime) <= new Date().setHours(23, 59, 59, 999)
  )
);
export default tasksSlice.reducer;
