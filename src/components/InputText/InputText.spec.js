import { mount } from '@vue/test-utils';
import InputText from '@/components/InputText/InputText.vue';

describe('InputText.vue', () => {
  const wrapper = mount(InputText, {
    propsData: {
      smallSize: true,
    },
  });

  it('Should InputText--small class has applied when smallSize prop is set true', () => {
    expect(wrapper.props().smallSize).toBe(true);
    expect(wrapper.classes('InputText--small')).toBe(true);
  });
});
