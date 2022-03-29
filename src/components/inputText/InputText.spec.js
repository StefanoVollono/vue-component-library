import { mount } from '@vue/test-utils';
import InputText from '@/components/inputText/InputText.vue';

describe('InputText.vue', () => {

  const wrapper = mount(InputText, {
    propsData: {
      size: 'small'
    }
  });

  it('renders props.label when passed', () => {
    expect(wrapper.props().size).toBe('small');
  });

});
