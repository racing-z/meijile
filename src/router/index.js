import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "Login" */ '../pages/login/login.vue')
const Register = () => import(/* webpackChunkName: "Register" */ '../pages/register/register.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../pages/home/home.vue')
// 系统管理
const Role = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/role/role.vue')
const Dict = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/dict/dict.vue')
const Menu = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/menu/menu.vue')
const User = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/user/user.vue')
const Log = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/log/log.vue')
const Muban = () => import(/* webpackChunkName: "systemManage" */ '../pages/sysManage/mubanManage/mubanManage.vue')
const Sign = () => import(/* webpackChunkName: "systemManage */ '../pages/sysManage/sign/sign.vue')
// 站点管
const Station = () => import(/* webpackChunkName: "Station" */ '../pages/stationManage/station/station.vue')
// const addStation = () => import(/* webpackChunkName: Station */ '../pages/station/addStation/addStation')

const Official = () => import(/* webpackChunkName: "systemManage" */ '../components/modules/official/official.vue')
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                mainUrl: 'user'
            },
            children: [
                // 系统管理
                {
                    path: 'user', // 用户管理
                    name: 'user',
                    component: User,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'role', // 角色管理
                    name: 'role',
                    component: Role,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'menu', // 菜单管理
                    name: 'menu',
                    component: Menu,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'dict', // 数据字典
                    name: 'dict',
                    component: Dict,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'log', // 系统日志
                    name: 'log',
                    component: Log,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'template', // 模板管理
                    name: 'template',
                    component: Muban,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                {
                    path: 'sign', // 内容标志管理
                    name: 'sign',
                    component: Sign,
                    meta: {
                        mainUrl: 'user'
                    }
                },
                // 站点管理
                {
                    path: 'station', // 站点管理
                    name: 'station',
                    component: Station,
                    meta: {
                        mainUrl: 'station'
                    }
                },
                {
                    path: 'content', // 内容管理
                    name: 'content',
                    component: Official,
                    meta: {
                        mainUrl: 'station'
                    }
                },
                {
                    path: 'flow',
                    name: 'flow',
                    component: Station
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }
    ]
})
// router.beforeEach(({name}, from, next) => {
//   if (localStorage.getItem('currentUser_token')) {
//   }
// })
export default router
