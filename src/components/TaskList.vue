<template>
  <div class="task-list">
    <h2>Task List</h2>
    <div v-if="sortedTasks.length === 0" class="empty-state">
      No tasks available. Add a new task to get started!
    </div>
    <ul v-else>
      <li v-for="task in sortedTasks" :key="task.id" class="task-item">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Due: {{ formattedDate(task.dueDate) }}</p>
        <p :class="['status', task.status.toLowerCase()]">
          Status: {{ task.status }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { Task, TaskStatus } from "../types/task";

export default defineComponent({
  name: "TaskList",
  setup() {
    const taskStore = useTaskStore();
    taskStore.addTask({
      id: 1,
      title: "Task 1 title",
      description: "Task 1 Description: Lorem ipsum dolor amet",
      dueDate: "2024-10-05",
      status: TaskStatus.Completed,
    });
    taskStore.addTask({
      id: 2,
      title: "Task 2 title",
      description: "Task 2 Description: Lorem ipsum dolor amet",
      dueDate: "2024-10-05",
      status: TaskStatus.InProgress,
    });
    taskStore.addTask({
      id: 3,
      title: "Task 3 title",
      description: "Task 3 Description: Lorem ipsum dolor amet",
      dueDate: "2024-10-05",
      status: TaskStatus.Pending,
    });

    const sortedTasks = computed(() => {
      return taskStore.tasks.slice().sort((a: Task, b: Task) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB;
      });
    });

    const formattedDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    return {
      sortedTasks,
      formattedDate,
    };
  },
});
</script>

<style lang="scss" scoped>
$background-color: #f9f9f9;
$border-color: #ddd;
$text-color: #888;
$hover-bg-color: #f1f1f1;
$pending-color: orange;
$completed-color: green;
$overdue-color: red;

.task-list {
  padding: 20px;
  background-color: $background-color;
  border-radius: 8px;

  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    color: #2c3e50;
  }

  .empty-state {
    text-align: center;
    color: $text-color;
    font-style: italic;
    padding: 20px 0;
  }

  ul {
    list-style-type: none;
    padding: 0;

    .task-item {
      border-bottom: 1px solid $border-color;
      padding: 10px 0;
      transition: background-color 0.3s;

      &:hover {
        background-color: $hover-bg-color;
      }

      &:last-child {
        border-bottom: none;
      }

      h3 {
        margin: 0 0 5px 0;
        font-size: 1.2rem;
        color: #34495e;
      }

      p {
        margin: 5px 0;
        color: #2c3e50;

        &.status {
          font-weight: bold;
          text-transform: capitalize;

          &.pending {
            color: $pending-color;
          }

          &.completed {
            color: $completed-color;
          }

          &.overdue {
            color: $overdue-color;
          }
        }
      }
    }
  }
}
</style>
