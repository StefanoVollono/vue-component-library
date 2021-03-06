import Button from './Button.vue';

export default {
  title: 'Vue UI Library/Button',
  component: Button,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    theme: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const PrimaryLarge = Template.bind({});
PrimaryLarge.args = {
  label: 'Primary Large Button',
  size: 'large',
  theme: 'primary',
};

export const SecondaryMedium = Template.bind({});
SecondaryMedium.args = {
  label: 'Medium Button',
  size: 'medium',
  theme: 'secondary',
};

export const SmallPrimaryDisabled = Template.bind({});
SmallPrimaryDisabled.args = {
  label: 'Medium Button',
  size: 'small',
  theme: 'primary',
  ...Disabled.args,
};
