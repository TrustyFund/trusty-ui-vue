import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line
import vuexBitshares from 'lib/src';

Vue.use(Vuex);

const store = new Vuex.Store();
vuexBitshares(store);

export default store;
