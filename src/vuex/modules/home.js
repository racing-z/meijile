import api from '../api'
import * as type from '../type'

const state = {
  mainMenu: [],
  childMenu: []
}
const actions = {
  getMainMenu: function ({commit}) {
    api.getMainMenu(function (res) {
      commit(type.GET_MAIN_MENU, res)
    })
  },
  getChildMenu: function ({commit}, parentId) {
    api.getChildMenu(parentId, function (res) {
      commit(type.GET_CHILD_MENU, res)
    })
  }
}
const getters = {
  mainMenu: state => state.mainMenu,
  childMenu: state => state.childMenu
}
const mutations = {
  [type.GET_MAIN_MENU] (state, res) {
    state.mianMenu = res
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
