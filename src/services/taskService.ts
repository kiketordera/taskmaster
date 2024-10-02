import axios from "axios";
import { Task, NewTask, TaskStatus } from "../types/task";

const apiUrl = "http://localhost:3000/tasks";

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(apiUrl);
    return response.data;
  },

  async addTask(task: NewTask): Promise<Task> {
    const response = await axios.post<Task>(apiUrl, task);
    return response.data;
  },

  async editTask(updatedTask: Task): Promise<Task> {
    const response = await axios.put<Task>(
      `${apiUrl}/${updatedTask.id}`,
      updatedTask
    );
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await axios.delete(`${apiUrl}/${taskId}`);
  },

  async changeTaskStatus(taskId: string, newStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    if (!task) throw new Error("Task not found");
    const updatedTask: Task = { ...task, status: newStatus };
    return this.editTask(updatedTask);
  },

  async getTaskById(taskId: string): Promise<Task | undefined> {
    try {
      const response = await axios.get<Task>(`${apiUrl}/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      return undefined;
    }
  },
};
