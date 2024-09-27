import { defineStore } from "pinia";
import { ref } from "vue";
import { Task, TaskStatus } from "../types/task";
import { v4 as uuidv4 } from 'uuid';


export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: uuidv4() };
    tasks.value.push(newTask);
  };
  

  const editTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  };

  const deleteTask = (taskId: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  };

  const changeTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  };

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    changeTaskStatus,
  };
});
