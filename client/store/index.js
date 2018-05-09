import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'vuex-bitshares';
import app from './app';
import assetInfo from './modules/assetInfo';
import cryptobot from './modules/cryptobot';
import portfolio from './modules/portfolio';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    assetInfo,
    cryptobot,
    portfolio
  }
});
vuexBitshares(store);

export default store;
