import TaskItem from '../components/TaskItem.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { TaskStatus } from '../types/task';

export default {
  title: 'Components/TaskItem',
  component: TaskItem,
  argTypes: {
    edit: { action: 'edit' },
    delete: { action: 'delete' },
  },
} as Meta<typeof TaskItem>;

const Template: StoryFn = (args) => ({
  components: { TaskItem },
  setup() {
    return { args };
  },
  template: `<TaskItem v-bind="args" @edit="args.edit" @delete="args.delete" />`,
});

export const Pending = Template.bind({});
Pending.args = {
  task: {
    id: '1',
    title: 'Pending Task',
    description: 'This task is pending.',
    dueDate: '2024-10-10',
    status: TaskStatus.Pending,
  },
};

export const InProgress = Template.bind({});
InProgress.args = {
  task: {
    id: '2',
    title: 'In Progress Task',
    description: 'This task is in progress.',
    dueDate: '2024-11-15',
    status: TaskStatus.InProgress,
  },
};

export const Completed = Template.bind({});
Completed.args = {
  task: {
    id: '3',
    title: 'Completed Task',
    description: 'This task is completed.',
    dueDate: '2024-09-20',
    status: TaskStatus.Completed,
  },
};

export const Overdue = Template.bind({});
Overdue.args = {
  task: {
    id: '4',
    title: 'Completed Task',
    description: 'This task is overdue.',
    dueDate: '2024-02-21',
    status: TaskStatus.Overdue,
  },
};