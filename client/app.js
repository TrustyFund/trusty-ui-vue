/* eslint-disable */

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import root from './root';
import router from './router';
import store from './store';

sync(store, router);

const app = new Vue({
  router,
  store,
  ...root
});

export { app, router, store };
