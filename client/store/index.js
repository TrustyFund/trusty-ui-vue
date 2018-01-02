import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter'
import apis from './modules/apis'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    counter,
    apis,
    user
  }
})

export default store
