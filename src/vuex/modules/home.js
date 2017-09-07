import api from '../api'
import * as type from '../type'

const state = {
  banner: [],
  nav: [
    {
      title: '用户管理',
      type: 'user',
      childern: [
        {
          title: '用户信息表',
          type: 'userInfo'
        },
        {
          title: '权限表',
          type: 'userPower'
        },
        {
          title: '角色表',
          type: 'userRole'
        }
      ]
    },
    {
      title: '系统管理',
      type: 'sys',
      childern: [
        {
          title: '系统基础信息表',
          type: 'sysInfo'
        }
      ]
    },
    {
      title: '站点管理',
      type: 'station'
    },
    {
      title: '频道管理',
      type: 'channel'
    },
    {
      title: '布局管理',
      type: 'layout'
    },
    {
      title: '组件管理',
      type: 'component'
    }
  ],
  menuList: [
    {
      title: '用户信息表',
      type: 'userInfo'
    },
    {
      title: '权限表',
      type: 'userPower'
    },
    {
      title: '角色表',
      type: 'userRole'
    }
  ]
}
const actions = {
  getBannerList: function ({commit}) {
    api.getBannerList(function (res) {
      commit(type.HOME_GET_BANNER_LIST, res.data)
    })
  },
  changeTab: function ({commit}, data) {
    commit(type.HOME_CHANGE_TAB, data)
  }
}
const getters = {
  getBannerList: state => state.banner,
  nav: state => state.nav,
  menuList: state => state.menuList
}
const mutations = {
  [type.HOME_GET_BANNER_LIST] (state, res) {
    state.banner = res.billboards
  },
  [type.HOME_CHANGE_TAB] (state, res) {
    let data = state.nav.filter((value, index) => {
      return value.type === res.type
    })
    state.menuList = data[0].childern
    console.log(data)
  }
}
export default {
  state,
  actions,
  getters,
  mutations
}
