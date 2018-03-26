import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Notifications from 'vue-notification';
import VueClipboard from 'vue-clipboard2';
import router from './router';
import store from './store';
import App from './components/App';

Vue.use(VueClipboard);

Vue.use(Notifications);
sync(store, router);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});

export { app, router, store };
