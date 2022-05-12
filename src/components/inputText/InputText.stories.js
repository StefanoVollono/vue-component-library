import MyInputText from './InputText.vue';

export default {
  title: 'Vue UI Library/Input text',
  component: MyInputText,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyInputText },
  template: '<my-input-text v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = { label: 'Input Primary' };
