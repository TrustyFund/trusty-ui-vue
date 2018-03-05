import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'lib/src';
import transfer from './transfer';
import app from './app';
import assetInfo from './modules/assetInfo';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transfer,
    app,
    assetInfo,
  }
});
vuexBitshares(store);

export default store;
