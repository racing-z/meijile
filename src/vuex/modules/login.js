import * as type from '../type'
import api from '../api'
const state = {
  isLogin: false,
  user: ''
}
const actions = {
  tologin: function ({commit}, data) {
    api.toLogin(data.mobile, data.password, function (res) {
      commit(type.TO_LOGIN, res)
    })
  }
}
const getters = {
  isLogin: (state) => state.isLogin
}
const mutations = {
  [type.TO_LOGIN] (state, data) {
    if (data.code === 0) {
      state.isLogin = true
      state.user = '朱启涛'
    } else {
      state.isLogin = false
      state.user = ''
    }
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
