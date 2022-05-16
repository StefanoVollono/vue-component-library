import MyInputText from './InputText.vue';

export default {
  title: 'Vue UI Library/Input text',
  component: MyInputText,
  argTypes: {
    smallSize: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyInputText },
  template: '<my-input-text v-bind="$props" />',
});

export const Input = Template.bind({});
Input.args = {
  label: 'Input Label',
  smallSize: false,
};

export const InputSmall = Template.bind({});
InputSmall.args = {
  label: 'Input Small Label',
  smallSize: true,
};
