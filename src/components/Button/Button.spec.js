import { mount } from '@vue/test-utils';
import Button from '@/components/button/Button.vue';

describe('Button.vue', () => {

  const wrapper = mount(Button, {
    propsData: {
      label: 'lorem'
    }
  });

  it('renders props.label when passed', () => {
    expect(wrapper.props().label).toBe('lorem');
  });

});
