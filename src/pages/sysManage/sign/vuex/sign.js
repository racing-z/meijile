import api from '@/vuex/api'
import * as type from '@/vuex/type'
import { resolve } from 'url'
// import router from '@/router/index'
const state = {
    signList: []
}
const actions = {
    getSignList: function ({ commit }, data) {
        api.getSignList(data).then((res) => {
            if (res.success) {
                commit(type.GET_SIGN_LIST, res.body.data)
            }
        })
    },
    addSignClick: function ({commit}, data) {
        return api.addSignClick(data)
    },
    editSignClick: function ({commit}, data) {
        return api.editSignClick(data)
    },
    removeSignClick: function ({commit}, data) {
        return api.removeSignClick(data)
    }
}
const getters = {
    signList: (state) => {
        // var stationDemo = state.stationList
        // if (state.mubanList.content) {
        //     for (let [index, item] of state.mubanList.content.entries()) {
        //         state.mubanList.content[index].createTime = new Date(state.mubanList.content[index].createTime).toLocaleString()
        //     }
        // }
        return state.signList
    }
}
const mutations = {
    [type.GET_SIGN_LIST] (state, data) {
        state.signList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
