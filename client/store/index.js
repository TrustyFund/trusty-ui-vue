import Vue from 'vue';
import Vuex from 'vuex';
import vueBitshares from './vuex-bitshares/src';

Vue.use(Vuex);

const store = new Vuex.Store();

vueBitshares(store);

export default store;
