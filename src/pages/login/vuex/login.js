import api from '@/vuex/api'
import * as type from '@/vuex/type'
import router from '@/router/index'
const state = {
    isLogin: false,
    userName: localStorage.getItem('currentUser_name'),
    userToken: localStorage.getItem('currentUser_token'),
    mobileErrorText: '',
    passwordErrorText: ''
}
const actions = {
    tologin: function ({ commit }, data) {
        if (data.mobile === '') {
            commit('SET_MOBILEERRORTEXT', { msg: '手机号不能为空' })
            commit('SET_PASSWORDERRORTEXT', { msg: '' })
        } else if (data.password === '') {
            commit('SET_PASSWORDERRORTEXT', { msg: '密码不能为空' })
            commit('SET_MOBILEERRORTEXT', { msg: '' })
        } else {
            api.toLogin(data.mobile, data.password, function (res) {
                if (res.success) {
                    commit(type.SET_TOKEN_NAME, { 'userName': res.body.data.userName, 'userToken': res.body.data.token })
                    router.push('/')
                } else {
                    commit('SET_MOBILEERRORTEXT', { msg: '' })
                    commit('SET_PASSWORDERRORTEXT', { msg: res.msg })
                }
            })
        }
    }
}
const getters = {
    isLogin: (state) => state.isLogin,
    userToken: (state) => state.userToken,
    mobileErrorText: () => state.mobileErrorText,
    passwordErrorText: () => state.passwordErrorText
}
const mutations = {
    [type.SET_TOKEN_NAME] (state, { userName, userToken }) {
        localStorage.setItem('currentUser_name', userName)
        localStorage.setItem('currentUser_token', userToken)
    },
    [type.SET_MOBILEERRORTEXT]: (state, { msg }) => {
        state.mobileErrorText = msg
        console.log(state.mobileErrorText)
    },
    [type.SET_PASSWORDERRORTEXT]: (state, { msg }) => {
        state.passwordErrorText = msg
        console.log(state.passwordErrorText)
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
