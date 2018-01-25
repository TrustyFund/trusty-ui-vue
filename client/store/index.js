import Vue from 'vue';
import Vuex from 'vuex';
import vuexBitshares from './vuex-bitshares/src';

Vue.use(Vuex);

const store = new Vuex.Store();
vuexBitshares(store);

export default store;
