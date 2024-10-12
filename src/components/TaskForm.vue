<template>
  <form @submit.prevent="handleSubmit" class="task-form" novalidate>
    <div class="form-group">
      <label for="title">Title</label>
      <input
        v-model.trim="title"
        id="title"
        type="text"
        required
        :class="{ 'input-error': errors.title }"
        aria-describedby="title-error"
      />
      <span v-if="errors.title" id="title-error" class="error-message">
        {{ errors.title }}
      </span>
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        v-model.trim="description"
        id="description"
        required
        :class="{ 'input-error': errors.description }"
        aria-describedby="description-error"
      ></textarea>
      <span
        v-if="errors.description"
        id="description-error"
        class="error-message"
      >
        {{ errors.description }}
      </span>
    </div>

    <div class="form-group">
      <label for="dueDate">Due Date</label>
      <input
        v-model="dueDate"
        id="dueDate"
        type="date"
        required
        :class="{ 'input-error': errors.dueDate }"
        aria-describedby="dueDate-error"
      />
      <span v-if="errors.dueDate" id="dueDate-error" class="error-message">
        {{ errors.dueDate }}
      </span>
    </div>

    <div class="form-group">
      <label for="status">Status</label>
      <select
        v-model="status"
        id="status"
        required
        :class="{ 'input-error': errors.status }"
        aria-describedby="status-error"
      >
        <option disabled value="">Select status</option>
        <option
          v-for="statusOption in statusOptions"
          :key="statusOption"
          :value="statusOption"
        >
          {{ statusOption }}
        </option>
      </select>
    </div>
    <span v-if="errors.status" id="status-error" class="error-message">
      {{ errors.status }}
    </span>
    <div v-if="isSubmitting" class="loading">
      {{ isEditMode ? "Updating task..." : "Adding task..." }}
    </div>

    <button type="submit" :disabled="isSubmitting">
      {{
        isSubmitting
          ? isEditMode
            ? "Updating..."
            : "Adding..."
          : isEditMode
          ? "Update Task"
          : "Add Task"
      }}
    </button>

    <div v-if="formError" class="error">
      {{ formError }}
    </div>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { TaskStatus, NewTask, Task } from "../types/task";

export default defineComponent({
  name: "TaskForm",
  props: {
    task: {
      type: Object as () => Task | null,
      default: null,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const taskStore = useTaskStore();
    const isEditMode = ref(false);

    const title = ref("");
    const description = ref("");
    const dueDate = ref("");
    const status = ref<TaskStatus | "">("");

    const errors = reactive<{
      title?: string;
      description?: string;
      dueDate?: string;
      status?: string;
    }>({});

    const isSubmitting = ref(false);
    const successMessage = ref("");
    const formError = ref<string | null>(null);
    const statusOptions = Object.values(TaskStatus);
    watch(
      () => props.task,
      (newTask) => {
        if (newTask) {
          isEditMode.value = true;
          title.value = newTask.title || "";
          description.value = newTask.description || "";
          dueDate.value = newTask.dueDate || "";
          status.value = newTask.status || "";
        } else {
          isEditMode.value = false;
          title.value = "";
          description.value = "";
          dueDate.value = "";
          status.value = "";
        }
      },
      { immediate: true, deep: true }
    );

    const validateForm = (): boolean => {
      errors.title = title.value.trim() ? undefined : "Title is required.";
      errors.description = description.value.trim()
        ? undefined
        : "Description is required.";
      errors.dueDate = dueDate.value ? undefined : "Due date is required.";
      errors.status = status.value ? undefined : "Status is required.";

      // Due date validation: should not be in the past
      if (dueDate.value) {
        const selectedDate = new Date(dueDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          errors.dueDate = "Due date cannot be in the past.";
        }
      }

      return !Object.values(errors).some((error) => error !== undefined);
    };

    const handleSubmit = async () => {
      if (!validateForm()) {
        return;
      }

      isSubmitting.value = true;
      successMessage.value = "";
      formError.value = null;

      try {
        if (isEditMode.value && props.task) {
          const updatedTask: Task = {
            id: props.task.id,
            title: title.value.trim(),
            description: description.value.trim(),
            dueDate: dueDate.value,
            status: status.value as TaskStatus,
          };
          await taskStore.editTask(updatedTask);
          successMessage.value = "Task updated successfully!";
        } else {
          const newTask: NewTask = {
            title: title.value.trim(),
            description: description.value.trim(),
            dueDate: dueDate.value,
            status: status.value as TaskStatus,
          };
          await taskStore.addTask(newTask);
          successMessage.value = "Task added successfully!";
        }

        if (!isEditMode.value) {
          title.value = "";
          description.value = "";
          dueDate.value = "";
          status.value = "";
        }

        emit("close");
      } catch (err) {
        formError.value = isEditMode.value
          ? "Failed to update task."
          : "Failed to add task.";
        console.error(
          `Failed to ${isEditMode.value ? "update" : "add"} task:`,
          err
        );
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      title,
      description,
      dueDate,
      status,
      statusOptions,
      handleSubmit,
      errors,
      isSubmitting,
      successMessage,
      formError,
      isEditMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.task-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: $background-color;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
      font-family: $bold;
    }

    input,
    textarea,
    select {
      padding: 8px 12px;
      border: 1px solid $purple;
      border-radius: 4px;
      font-size: 16px;
      font-family: $regular;

      &:focus {
        border-color: $blue;
        outline: none;
      }

      &.input-error {
        border-color: $pink;
      }
    }
  }

  .error-message {
    color: $pink;
    font-size: 14px;
    margin-top: 5px;
    font-family: $regular;
  }

  .success-message {
    margin-top: 15px;
    color: $green;
    font-size: 16px;
    text-align: center;
    font-family: $regular;
  }

  button {
    @include button;
  }
}
</style>
