import api from '@/vuex/api'
import * as type from '@/vuex/type'
import { resolve } from 'url'
// import router from '@/router/index'
const state = {
    mubanList: []
}
const actions = {
    getMubanList: function ({ commit }, data) {
        api.getMubanList(data.page, data.size).then(res => {
            if (res.success) {
                commit(type.GET_MUBAN_LIST, res.body.data)
            }
        })
    },
    addMubanClick: function ({commit}, data) {
        return api.addMubanClick(data)
    },
    editMubanClick: function ({commit}, data) {
        return api.editMubanClick(data)
    },
    removeMubanClick: function ({commit}, data) {
        return api.removeMubanClick(data)
    }
}
const getters = {
    mubanList: (state) => {
        // var stationDemo = state.stationList
        // if (state.mubanList.content) {
        //     for (let [index, item] of state.mubanList.content.entries()) {
        //         state.mubanList.content[index].createTime = new Date(state.mubanList.content[index].createTime).toLocaleString()
        //     }
        // }
        return state.mubanList
    }
}
const mutations = {
    [type.GET_MUBAN_LIST] (state, data) {
        state.mubanList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
