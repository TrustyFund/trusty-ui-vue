import Vue from 'vue'
import Vuex from 'vuex'
import apis from './modules/apis'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    apis,
    user
  }
})

export default store
