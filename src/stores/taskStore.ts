import { defineStore } from "pinia";
import { ref } from "vue";
import { Task } from "../types/task";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);

  const addTask = (task: Task) => {
    tasks.value.push(task);
  };

  return {
    tasks,
    addTask,
  };
});
