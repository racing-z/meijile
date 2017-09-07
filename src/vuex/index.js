/**
 * Create by zechun.chen on 2016/12/22
 */

import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import home from './modules/home'
import login from './modules/login'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    home,
    base,
    login
  }
})

export default store
