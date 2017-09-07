import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import login from '../pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})
