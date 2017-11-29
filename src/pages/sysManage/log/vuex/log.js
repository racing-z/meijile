import api from '@/vuex/api'
import * as type from '@/vuex/type'

const state = {
    logList: []
}
const getters = {
    logList: (state) => {
        if (state.logList.content) {
            for (let [index, item] of state.logList.content.entries()) {
                state.logList.content[index].createDate = new Date(state.logList.content[index].createDate).toLocaleString()
            }
        }
        return state.logList
    }
}
const actions = {
    getLogList: ({commit}, data) => {
        api.getLogList(data.page, data.size, (res) => {
            commit(type.GET_LOG_LIST, res.body.data)
        })
    }
}
const mutations = {
    [type.GET_LOG_LIST] (state, data) {
        state.logList = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
