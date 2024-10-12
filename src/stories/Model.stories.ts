import Modal from '../components/Modal.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn = (args) => ({
  components: { Modal },
  setup() {
    return { args };
  },
  template: `
    <Modal v-bind="args" @close="args.onClose">
      <div>
        <h2>Modal Title</h2>
        <p>This is the content inside the modal.</p>
      </div>
    </Modal>
  `,
});

export const Default = Template.bind({});
Default.args = {
  onClose: () => alert('Modal closed'),
};