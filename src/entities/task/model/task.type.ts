export type TaskStatus = "todo" | "inProgress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  priority?: TaskPriority | "all";
  status?: TaskStatus | "all";
  tags?: string[];
  search?: string;
  sortByDate?: "desk" | "asc";
}

export const TASK_STATUSE_LABELS: Record<TaskStatus, string> = {
  todo: "Todo",
  inProgress: "In progress",
  done: "Done",
};

export const TASK_STATUSE_KEYS = Object.keys(
  TASK_STATUSE_LABELS
) as TaskStatus[];

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const TASK_PRIORITY_KEYS = Object.keys(
  TASK_PRIORITY_LABELS
) as TaskPriority[];
