import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
import App from './components/App';

sync(store, router);

const app = new Vue({
  // el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});

export { app, router, store };
