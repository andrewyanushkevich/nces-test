import { createSlice } from "@reduxjs/toolkit";

import type { TaskPriority, TaskStatus } from "@entities/task/model/task.type";
import type { RootStore } from "@/app/store/store";

interface InitialState {
  filters: {
    priority?: TaskPriority | "all";
    status?: TaskStatus | "all";
    tags?: string[];
  };
}

const initialState: InitialState = {
  filters: {},
};

export const taskFilterSlice = createSlice({
  reducerPath: "taskFilters",
  name: "task-filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return {
        filters: { ...state.filters, ...action.payload },
      };
    },
  },
});

export const { setFilters } = taskFilterSlice.actions;

export const getFilters = (state: RootStore) => state.taskFilters.filters;

export default taskFilterSlice.reducer;
