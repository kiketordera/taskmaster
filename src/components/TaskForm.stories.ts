import TaskForm from "./TaskForm.vue";
import { Meta, StoryFn } from "@storybook/vue3";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/jest";
import { Task, TaskStatus } from "../types/task";

export default {
  title: "Components/TaskForm",
  component: TaskForm,
  argTypes: {
    task: { control: "object" },
    onClose: { action: "closed" },
  },
} as Meta<typeof TaskForm>;

const Template: StoryFn = (args) => ({
  components: { TaskForm },
  setup() {
    return { args };
  },
  template: `<TaskForm v-bind="args" @close="args.onClose" />`,
});

export const AddTask = Template.bind({});
AddTask.args = {
  task: null, // Null indicates "Add" mode
};

export const EditTask = Template.bind({});
EditTask.args = {
  task: {
    id: "1",
    title: "Existing Task",
    description: "This is an existing task.",
    dueDate: "2024-12-31",
    status: TaskStatus.Pending,
  } as Task,
};

export const WithValidationErrors = Template.bind({});
WithValidationErrors.args = {
  task: null,
};

WithValidationErrors.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const submitButton = canvas.getByRole("button", { name: /Add Task/i });
  await userEvent.click(submitButton);

  await expect(canvas.getByText(/Title is required./i)).toBeInTheDocument();
  await expect(
    canvas.getByText(/Description is required./i)
  ).toBeInTheDocument();
  await expect(canvas.getByText(/Due date is required./i)).toBeInTheDocument();
  await expect(canvas.getByText(/Status is required./i)).toBeInTheDocument();
};

export const Submitting = Template.bind({});
Submitting.args = {
  task: null,
};

Submitting.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByLabelText(/Title/i), "New Task");
  await userEvent.type(canvas.getByLabelText(/Description/i), "Task description");

  // Set the value directly for the date input
  const dueDateInput = canvas.getByLabelText(/Due Date/i) as HTMLInputElement;
  dueDateInput.value = "2024-12-31";
  await userEvent.click(dueDateInput); // Trigger the date input field event

  await userEvent.selectOptions(
    canvas.getByLabelText(/Status/i),
    TaskStatus.Pending
  );
};
