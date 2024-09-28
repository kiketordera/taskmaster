<template>
  <div class="task-list">
    <h2>Task List</h2>
    <button @click="openForm" class="add-task-button">Add Task</button>

    <Modal v-if="isFormVisible" @close="closeForm">
      <TaskForm @close="closeForm" />
    </Modal>

    <EmptyState v-if="sortedTasks.length === 0">
      No tasks available. Add a new task to get started!
    </EmptyState>
    <ul v-else>
      <TaskItem v-for="task in sortedTasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskForm from './TaskForm.vue';
import TaskItem from './TaskItem.vue';
import EmptyState from './general/EmptyState.vue';
import Modal from './Modal.vue';

export default defineComponent({
  name: 'TaskList',
  components: {
    TaskForm,
    TaskItem,
    EmptyState,
    Modal,
  },
  setup() {
    const taskStore = useTaskStore();

    const sortedTasks = computed(() => {
      return taskStore.tasks.slice().sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    });

    const isFormVisible = ref(false);

    const openForm = () => {
      isFormVisible.value = true;
    };

    const closeForm = () => {
      isFormVisible.value = false;
    };

    return {
      sortedTasks,
      isFormVisible,
      openForm,
      closeForm,
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
