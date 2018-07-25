import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import tagsView from './modules/tagsView'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
  },
  getters,
})

export default store
