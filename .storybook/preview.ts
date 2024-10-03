import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import type { Decorator } from "@storybook/vue3";
import TaskForm from "../src/components/TaskForm.vue";

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const withPinia: Decorator = (storyFn) => ({
  components: { TaskForm: TaskForm },
  template: "<TaskForm />",
});

export const decorators = [withPinia];
