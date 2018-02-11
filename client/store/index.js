import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'lib/src';
import transfer from './transfer';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transfer
  }
});
vuexBitshares(store);

export default store;
