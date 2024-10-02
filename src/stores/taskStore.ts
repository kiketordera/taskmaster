import { defineStore } from "pinia";
import { ref } from "vue";
import { Task, TaskStatus, NewTask } from "../types/task";
import { taskService } from "../services/taskService";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchTasks = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const fetchedTasks = await taskService.fetchTasks();
      if (Array.isArray(fetchedTasks)) {
        tasks.value = fetchedTasks;
      } else {
        console.log("fetchedTasks", fetchedTasks)
        throw new Error("Fetched tasks is not an array.");
      }
    } catch (err) {
      error.value = "Failed to fetch tasks.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const addTask = async (task: NewTask) => {
    isLoading.value = true;
    error.value = null;
    try {
      const newTask = await taskService.addTask(task);
      tasks.value.push(newTask);
    } catch (err) {
      error.value = "Failed to add task.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const editTask = async (updatedTask: Task) => {
    isLoading.value = true;
    error.value = null;
    try {
      const editedTask = await taskService.editTask(updatedTask);
      const index = tasks.value.findIndex((task) => task.id === editedTask.id);
      if (index !== -1) {
        tasks.value[index] = editedTask;
      }
    } catch (err) {
      error.value = "Failed to update task.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTask = async (taskId: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await taskService.deleteTask(taskId);
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    } catch (err) {
      error.value = "Failed to delete task.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const changeTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    isLoading.value = true;
    error.value = null;
    try {
      const updatedTask = await taskService.changeTaskStatus(taskId, newStatus);
      const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
    } catch (err) {
      error.value = "Failed to change task status.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    changeTaskStatus,
  };
});
