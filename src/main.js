import Button from './components/Button/Button.vue';
import ButtonBig from './components/ButtonBig/ButtonBig.vue';
import store from './store';

const ComponentLibrary = {
  install(Vue = {}, options) {
    // Store
    if (!options || !options.store) {
      throw new Error('Please initialise plugin with a Vuex store.');
    }
    options.store.registerModule('vueComponentLibraryStore', store);

    // Components
    Vue.component('Button', Button);
    Vue.component('ButtonBig', ButtonBig);
  },
};

export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
