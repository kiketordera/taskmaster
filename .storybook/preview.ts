import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import type { Decorator } from "@storybook/vue3";

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const withPinia: Decorator = (storyFn) => ({
  components: { StoryComponent: storyFn() },
  template: "<StoryComponent />",
});

export const decorators = [withPinia];
