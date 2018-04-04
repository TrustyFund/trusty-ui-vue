import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueScrollTo from 'vue-scrollto';
import VueClipboard from 'vue-clipboard2';
import router from './router';
import store from './store';
import App from './components/App';
import toast from './services/toast';


Vue.use(VueClipboard);
Vue.use(VueScrollTo);
sync(store, router);

Vue.config.productionTip = false;
Vue.prototype.$toast = toast;

const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
});

export { app, router, store };
