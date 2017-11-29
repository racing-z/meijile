import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
    roleList: []
}
const actions = {
    getRoleList: function ({ commit }, state) {
        api.getRoleList(state).then(res => {
            if (res.success) {
                commit(type.GET_ROLE_LIST, res.body.data)
            }
        })
    }
}
const getters = {
    roleList: (state) => {
        // if (state.stationList.content) {
        //     for (let [index, item] of state.stationList.content.entries()) {
        //         state.stationList.content[index].createTime = new Date(state.stationList.content[index].createTime).toLocaleString()
        //     }
        // }
        return state.stationList
    }
}
const mutations = {
    [type.GET_ROLE_LIST] (state, data) {
        state.roleList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
