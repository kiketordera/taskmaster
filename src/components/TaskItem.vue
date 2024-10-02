<template>
  <li class="task-item">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>
    <p>Due: {{ formattedDate(task.dueDate) }}</p>
    <p :class="['status', task.status.toLowerCase()]">
      Status: {{ task.status }}
    </p>
    <button @click="onEdit" class="edit-button">Edit</button>
    <button @click="onDelete" class="delete-button">Delete</button>
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
  emits: ["edit", "delete"],
  setup(props, { emit }) {
    const { formattedDate } = useDateFormatter();

    const onEdit = () => {
      emit("edit", props.task);
    };

    const onDelete = () => {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (userConfirmed) {
        emit("delete", props.task.id);
      }
    };

    return {
      formattedDate,
      onEdit,
      onDelete,
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

  button {
    @include button;
    margin-right: 20px;
    &.edit-button {
      background-color: $orange;
    }
    &.delete-button {
      background-color: $brown;
    }
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
