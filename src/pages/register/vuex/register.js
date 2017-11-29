import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
  mobile: '',
  password: '',
  smsCode: ''
}
const actions = {
  getSmsCode: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      api.getSmscode(data, function (res) {
        if (res.success) {
          commit(type.GET_SMSCODE, res.body.code)
        }
        resolve(res)
      })
    })
  },
  register: function ({commit}, data) {
    api.register(data, function (res) {
      console.log(res)
      if (res.success) { // 注册成功  跳转登录
        alert(res.msg)
        router.push('login')
      } else { // 注册失败
        alert(res.msg)
      }
    })
  }
}
const getters = {
  smsCode: (state) => state.smsCode
}
const mutations = {
  [type.GET_SMSCODE] (state, code) {
    state.smsCode = code
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
