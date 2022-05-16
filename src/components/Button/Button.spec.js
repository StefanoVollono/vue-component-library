import { mount } from '@vue/test-utils';
import Button from '@/components/Button/Button.vue';

describe('Button.vue', () => {
  const wrapper = mount(Button, {
    propsData: {
      label: 'Lorem ipsum',
    },
  });

  it('The button text should match the value passed in prop', () => {
    expect(wrapper.props().label).toBe('Lorem ipsum');
  });
});
