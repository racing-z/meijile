/**
 * Create by zechun.chen on 2016/12/22
 */

import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import home from '../pages/home/vuex/home'
import login from '../pages/login/vuex/login'
import register from '../pages/register/vuex/register'
// 站点管理
import station from '../pages/stationManage/station/vuex/station'
// import station from '../pages/sysManage/'
// 系统管理
import log from '../pages/sysManage/log/vuex/log' // 日志管理
import role from '../pages/sysManage/role/vuex/role' // 角色管理
import menu from '../pages/sysManage/menu/vuex/menu' // 菜单管理
import mubanManage from '../pages/sysManage/mubanManage/vuex/mubanManage' // 模板管理
import sign from '../pages/sysManage/sign/vuex/sign'
// import mubanManage from ''
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    home,
    base,
    login,
    register,
    station,
    log,
    role,
    menu,
    mubanManage,
    sign
  }
})

export default store
