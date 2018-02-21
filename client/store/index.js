import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'lib/src';
import transfer from './transfer';
import app from './app';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transfer,
    app
  }
});
vuexBitshares(store);

export default store;
