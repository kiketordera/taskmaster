export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in progress",
  Completed = "completed",
  Overdue = "overdue",
}
