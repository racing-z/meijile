import axios from 'axios'
import router from '../router/index'
const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/api/' : 'http://47.94.136.171/api/'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // config.headers['Access-Control-Allow-Origin'] = '*'
        // config.headers['Access-Control-Request-Headers'] = 'X-PINGOTHER, Content-Type'
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (localStorage.currentUser_token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authentication = `${localStorage.currentUser_token}`
        } else {
            // this.$router.push('/login')
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    res => {
        if (res.data.code === 401) { // 验证失败
            localStorage.removeItem('currentUser_token')
            router.push('/login')
            // window.tip('请重新登录')
            return
        } else {
            return res.data
        }
    })

const funcAxios = (method, url, data, cb) => {
    axios({
        method: method,
        url: url,
        data: data
    }).then((res) => {
        cb(res)
    }).catch((err) => {
        cb(err)
        // return Promise.reject(err)
    })
}
const funcAxiosStr = (method, url, data, cb) => {
    axios({
        method: method,
        url: url,
        data: querystring.stringify(data)
    }).then((res) => {
        cb(res)
    }).catch((err) => {
        cb(err)
        console.log(err)
        return Promise.reject(err)
    })
}
const funcAxiosStrPro = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: querystring.stringify(data)
    })
}
export default {

// --------------------------------------------------------------- 系统相关接口开始 ---------------------------------------------------------------

    // ---------------------------------- 系统角色相关开始 ----------------------------------
    // 获取系统角色分页列表信息接口
    getRoleList: (state) => {
        return funcAxiosStrPro('POST', url + 'role/list', {page: state.page, size: state.size})
    },
    // 修改系统角色名称接口
    editRole: (roleId, roleName, cb) => {
        funcAxiosStr('POST', url + 'role/edit', {name: roleName, id: roleId}, cb)
    },
    // 新增系统角色名称接口
    addRole: (roleName, cb) => {
        funcAxiosStr('POST', url + 'role/edit', {name: roleName}, cb)
    },
    // 删除系统角色名称接口
    delRole: (roleId, cb) => {
        funcAxiosStr('POST', url + 'role/edit', {id: roleId}, cb)
    },

    // ---------------------------------- 系统菜单相关开始 ----------------------------------
    // 获取所有系统主菜单
    getAllMainMenuList: () => {
        return funcAxiosStrPro('POST', url + 'menu/allMainMenu', null)
    },
    // 根据父级菜单id获取所有的子菜单
    getAllChildMenu: (parentId) => {
        return funcAxiosStrPro('POST', url + 'menu/allChildrenMenu', { parentId: parentId })
    },
    // 获取该用户权限的主菜单
    getMainMenu: (cb) => {
        funcAxiosStr('POST', url + 'menu/mainMenu', null, cb)
    },
    // 根据父级菜单获取该用户下的子菜单
    getChildMenu: (parentId, cb) => {
        funcAxiosStr('POST', url + 'menu/childrenMenu', { parentId: parentId }, cb)
    },
    // 修改系统菜单名称接口
    editMenuClick: (state) => {
        return funcAxiosStrPro('POST', url + 'menu/edit', {
            name: state.zhName,
            id: state.id,
            url: state.url,
            type: state.type,
            icon: state.icon,
            orderNum: state.orderNum,
            colour: state.colour
        })
    },
    // 新增系统菜单名称接口
    addMenuClick: (state) => {
        return funcAxiosStrPro('POST', url + 'menu/add', {
            parentId: state.id,
            name: state.zhName,
            url: state.url,
            type: state.type,
            icon: state.icon,
            orderNum: state.orderNum,
            colour: state.colour
        })
    },
    // 删除系统菜单名称接口
    removeMenuClick: (state) => {
        return funcAxiosStrPro('POST', url + 'menu/edit', {id: state.id})
    },

    // ---------------------------------- 系统日志相关开始 ----------------------------------
    // 获取系统日志分页列表信息接口
    getLogList: (page, size, cb) => {
        funcAxiosStr('POST', url + 'log/list', {page: page, size: size}, cb)
    },

    // ---------------------------------- 系统模板管理相关开始 ----------------------------------
    // 获取模板列表信息接口
    getMubanList: (page, size) => {
        return funcAxiosStrPro('POST', url + 'template/list', {page: page, size: size})
    },
    // 添加模板信息接口
    addMubanClick: (state) => {
        return funcAxiosStrPro('POST', url + 'template/add', {
            enName: state.enName, // 模板英文名字
            zhName: state.zhName, // 模板中文名字
            linkurl: state.url, // 模板链接
            type: state.type // 模板类型
        })
    },
    // 添加模板信息接口
    editMubanClick: (state) => {
        return funcAxiosStrPro('POST', url + 'template/edit', {
            id: state.id, // 模板id
            enName: state.enName, // 模板英文名字
            zhName: state.zhName, // 模板中文名字
            linkurl: state.url, // 模板链接
            type: state.type // 模板类型
        })
    },
    // 添加模板信息接口
    removeMubanClick: (state) => {
        return funcAxiosStrPro('POST', url + 'template/del', {
            id: state.id // 模板id
        })
    },

    // ---------------------------------- 系统内容标志相关开始 ----------------------------------
    // 获取内容标志列表
    getSignList: (state) => {
        return funcAxiosStrPro('POST', url + 'sign/list', {page: state.page, size: state.size})
    },
    // 添加内容标志
    addSignClick: (state) => {
        return funcAxiosStrPro('post', url + 'sign/add', {
            enName: state.enName, // 内容标志英文名字
            zhName: state.zhName, // 内容标志中文名字
            contentType: state.type // 内容标志类型（1：文本；2：图片；3：链接）
        })
    },
    // 编辑内容标志
    editSignClick: (state, cb) => {
        return funcAxiosStrPro('post', url + 'sign/edit', {
            id: state.id, // 内容标志的id
            enName: state.enName, // 内容标志的英文名字
            zhName: state.zhName, // 内容标志的中文名字
            contentType: state.type // 内容标志的类型（1：文本；2：图片；3：链接）
        })
    },
    // 删除内容标志
    removeSignClick: (state, cb) => {
        return funcAxiosStrPro('post', url + 'sign/del', {id: state.id}, cb)
    },

// ---------------------------------------------------------------系统相关接口结束---------------------------------------------------------------
    /**
     * 登陆接口
     */
    toLogin: (mobile, password, cb) => { // 登录请求
        funcAxios('POST', url + 'login', querystring.stringify({
            'mobile': mobile,
            'password': password
        }), cb)
    },
    loginOut: (cb) => {
        funcAxios('POST', url + 'loginOut', null, cb)
    },
    getSmscode: (mobile, cb) => { // 获取验证码
        funcAxios('POST', url + 'getSmsCode', querystring.stringify({ 'mobile': mobile }), cb)
    },
    register: (data, cb) => { // 注册
        funcAxios('POST', url + 'register', data, cb)
    },
    // 站点管理 station
    getStationList: (page, size, cb) => { // 获取站点信息
        funcAxios('POST', url + 'station/list', querystring.stringify({page: page, size: size}), cb)
    },
    addStation: (stationName, cb) => { // 添加站点
        funcAxios('POST', url + 'station/add', querystring.stringify({name: stationName}), cb)
    },
    removeStation: (stationId, cb) => { // 删除站点
        funcAxios('POST', url + 'station/del', querystring.stringify({id: stationId}), cb)
    },
    editStation: (stationId, stationName, cb) => { // 编辑修改站点名字
        funcAxios('POST', url + 'station/edit', querystring.stringify({name: stationName, id: stationId}), cb)
    }
}
