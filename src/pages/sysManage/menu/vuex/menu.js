import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
    allMainMenuList: [],
    allChildMenuList: []
}
const actions = {
    getAllMainMenuList: function ({ commit }) {
        api.getAllMainMenuList().then(res => {
            commit(type.GET_ALL_MAIN_MENU_LIST, res.body.data)
        })
    },
    getAllChildMenuList: function ({commit, state}, parentId) {
        this.state.allChildMenuList = []
        api.getAllChildMenu(parentId).then(res => {
            commit(type.GET_ALL_CHILD_MENU_LIST, res.body.data)
        })
    },
    addMenuClick: function ({commit}, state) {
        return api.addMenuClick(state)
    },
    editMenuClick: ({commit}, state) => {
        return api.editMenuClick(state)
    },
    removeMenuClick: ({commit}, state) => {
        return api.removeMenuClick(state)
    },
    editTableData: ({commit, state}, menuId) => {
        commit(type.EDIT_TABLE_DATA, menuId)
    }
}
const getters = {
    allMainMenuList: (state) => {
        // for (let [index, item] of state.allChildMenuList.entries()) {
        //     state.allChildMenuList[index]['_expanded'] = true
        // }
        return state.allMainMenuList
    },
    allChildMenuList: (state) => {
        return state.allChildMenuList
    }
}
const mutations = {
    [type.GET_ALL_MAIN_MENU_LIST] (state, data) {
        state.allMainMenuList = data
    },
    [type.GET_ALL_CHILD_MENU_LIST] (state, data) {
        state.allChildMenuList = data
    },
    [type.EDIT_TABLE_DATA] (state, menuId) {
        for (let [i, v] of state.allMainMenuList.entries()) {
            state.allMainMenuList[i]['_expanded'] = false
        }
        let index = state.allMainMenuList.filter((v, i) => {
            if (state.allMainMenuList[i]['menuId'] === menuId) {
                state.allMainMenuList[i]['_expanded'] = true
                state.allMainMenuList[i]['name'] += ' '
                state.allMainMenuList[i]['name'] = state.allMainMenuList[i]['name'].replace(/\s+/g, "")
            }
            return index
        })
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
