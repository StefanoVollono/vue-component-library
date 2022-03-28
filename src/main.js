import components from './components/index';
import store from './store';

const ComponentLibrary = {
  install(Vue = {}, options) {
    // Store
    if (!options || !options.store) {
      throw new Error('Please initialise plugin with a Vuex store.');
    }
    options.store.registerModule('vueComponentLibraryStore', store);

    // Components
    Object.keys(components).forEach((key) => {
      const component = components[key];
      Vue.component(component.name, component);
    });
  },
};

export default ComponentLibrary;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}
