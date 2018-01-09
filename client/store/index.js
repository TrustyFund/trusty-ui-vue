import Vue from 'vue'
import Vuex from 'vuex'
import apis from './modules/apis'
import user from './modules/user'
import assets from './modules/assets'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    apis,
    user,
    assets
  }
})

export default store
