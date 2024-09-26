<template>
  <li class="task-item">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Due: {{ formattedDate(task.dueDate) }}</p>
    <p :class="['status', task.status.toLowerCase()]">
      Status: {{ task.status }}
    </p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Task } from "../types/task";
import { useDateFormatter } from "../composables/useDateFormatter";

export default defineComponent({
  name: "TaskItem",
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  setup(_) {
    const { formattedDate } = useDateFormatter();

    return {
      formattedDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-item {
  border-bottom: 1px solid $purple;
  padding: 10px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: $background-color;
  }

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
    font-family: $medium;
    color: $purple;
  }

  p {
    margin: 5px 0;
    color: $purple;
  }

  p.status {
    font-family: $medium;
    text-transform: capitalize;

    &.pending {
      @include status-color("pending");
    }

    &.completed {
      @include status-color("completed");
    }

    &.overdue {
      @include status-color("overdue");
    }
  }
}
</style>
