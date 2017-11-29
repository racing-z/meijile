import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'

const state = {
  mainMenu: [],
  childMenu: []
}
const actions = {
  getMainMenu: function ({dispatch, commit}, mainUrl) {
    api.getMainMenu(function (res) {
      if (res) { // 能获取到返回信息 说明响应拦截通过 登录正常
        commit(type.GET_MAIN_MENU, res.body.data)
        let currentMenu = res.body.data.filter(function (item) {
            return item.url === mainUrl
        })
        dispatch('getChildMenu', currentMenu[0].menuId)
        // router.push({name: res.body.data[0].url})
      }
    })
  },
  getChildMenu: function ({commit}, menuId) {
    api.getChildMenu(menuId, function (res) {
      if (res) {
        commit(type.GET_CHILD_MENU, res.body.data)
        // alert(res.body.data[0].url)
        // router.push({name: res.body.data[0].url})
      }
    })
  }
}
const getters = {
  mainMenu: state => state.mainMenu,
  childMenu: state => state.childMenu
}
const mutations = {
  [type.GET_MAIN_MENU] (state, res) {
    state.mainMenu = res
  },
  [type.GET_CHILD_MENU] (state, res) {
    state.childMenu = res
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
