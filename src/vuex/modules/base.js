import * as type from '../type'

const state = {
  isMobile: false
}
const actions = {
  getIsMobile: function ({commit}, data) {
    commit(type.BASE_IS_MOBILE, data)
  }
}
const getters = {
  isMobile: (state) => state.isMobile
}
const mutations = {
  [type.BASE_IS_MOBILE] (state, res) {
    state.isMobile = res
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
