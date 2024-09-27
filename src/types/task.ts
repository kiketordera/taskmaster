export type NewTask = Omit<Task, 'id'>;

export interface Task {
  id: string;
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
