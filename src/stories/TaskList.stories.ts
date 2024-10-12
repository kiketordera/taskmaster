import TaskList from '../components/TaskList.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/TaskList',
  component: TaskList,
} as Meta<typeof TaskList>;

const Template: StoryFn = (args) => ({
  components: { TaskList },
  setup() {
    return { args };
  },
  template: `<TaskList />`,
});

export const WithTasks = Template.bind({});
WithTasks.args = {
};

export const EmptyList = Template.bind({});
EmptyList.args = {
};