<template>
  <div class="task-list">
    <h2>Task List</h2>
    <button @click="openForm" class="add-task-button">Add Task</button>

    <div class="controls">
      <div class="filter">
        <label for="statusFilter">Filter by Status:</label>
        <select id="statusFilter" v-model="statusFilter">
          <option value="">All</option>
          <option
            v-for="statusOption in statusOptions"
            :key="statusOption"
            :value="statusOption"
          >
            {{ statusOption }}
          </option>
        </select>
      </div>

      <div class="sort">
        <label for="dueDateSort">Sort by Due Date:</label>
        <select id="dueDateSort" v-model="dueDateSort">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <Modal v-if="isFormVisible" @close="closeForm">
      <TaskForm :task="selectedTask" @close="closeForm" />
    </Modal>

    <EmptyState v-if="filteredAndSortedTasks.length === 0">
      No tasks available. Add a new task to get started!
    </EmptyState>
    <ul v-else>
      <TaskItem
        v-for="task in filteredAndSortedTasks"
        :key="task.id"
        :task="task"
        @edit="handleEdit"
        @delete="handleDelete"
        @change-status="handleChangeStatus"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";
import EmptyState from "./general/EmptyState.vue";
import Modal from "./Modal.vue";
import { Task, TaskStatus } from "../types/task";

export default defineComponent({
  name: "TaskList",
  components: {
    TaskForm,
    TaskItem,
    EmptyState,
    Modal,
  },
  setup() {
    const taskStore = useTaskStore();

    const statusFilter = ref<string>("");
    const dueDateSort = ref<string>("asc");

    const statusOptions = Object.values(TaskStatus);

    const filteredAndSortedTasks = computed(() => {
      let tasks = taskStore.tasks.slice();

      if (statusFilter.value) {
        tasks = tasks.filter((task) => task.status === statusFilter.value);
      }

      tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dueDateSort.value === "asc" ? dateA - dateB : dateB - dateA;
      });

      return tasks;
    });

    const isFormVisible = ref(false);
    const selectedTask = ref<Task | null>(null);

    const openForm = () => {
      selectedTask.value = null;
      isFormVisible.value = true;
    };

    const closeForm = () => {
      isFormVisible.value = false;
      selectedTask.value = null;
    };

    const handleEdit = (task: Task) => {
      selectedTask.value = task;
      isFormVisible.value = true;
    };

    const handleDelete = (taskId: string) => {
      taskStore.deleteTask(taskId);
    };

    const handleChangeStatus = (taskId: string, newStatus: TaskStatus) => {
      taskStore.changeTaskStatus(taskId, newStatus);
    };

    return {
      statusFilter,
      dueDateSort,
      statusOptions,
      filteredAndSortedTasks,
      isFormVisible,
      openForm,
      closeForm,
      selectedTask,
      handleEdit,
      handleDelete,
      handleChangeStatus,
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
