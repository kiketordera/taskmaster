<template>
  <div class="task-list">
    <h2>Task List</h2>
    <EmptyState v-if="sortedTasks.length === 0">
      No tasks available. Add a new task to get started!
    </EmptyState>
    <ul v-else>
      <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import TaskItem from "./TaskItem.vue";
import EmptyState from "./general/EmptyState.vue";
import { Task, TaskStatus } from "../types/task";

export default defineComponent({
  name: "TaskList",
  components: {
    TaskItem,
    EmptyState,
  },
  setup() {
    const taskStore = useTaskStore();

    onMounted(() => {
      if (taskStore.tasks.length === 0) {
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
        taskStore.addTask({
          id: 3,
          title: "Task 4 title",
          description: "Task 4 Description: Lorem ipsum dolor amet",
          dueDate: "2024-10-05",
          status: TaskStatus.Overdue,
        });
      }
    });

    const sortedTasks = computed(() => {
      return taskStore.tasks.slice().sort((a: Task, b: Task) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    });

    return {
      sortedTasks,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-list {
  padding: 20px;
  background-color: $background-color;
  border-radius: 8px;

  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-family: $medium;
    color: $purple;
  }

  .empty-state {
    text-align: center;
    color: $purple;
    font-family: $regular;
    padding: 20px 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
}
</style>
