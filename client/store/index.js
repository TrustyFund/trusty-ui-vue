import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'lib/src';
import app from './app';
import assetInfo from './modules/assetInfo';
import cryptobot from './modules/cryptobot';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    assetInfo,
    cryptobot
  }
});
vuexBitshares(store);

export default store;
