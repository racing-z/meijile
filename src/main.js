// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './static/css/plugin/material-design-icons/font.css'
import './static/js/fontsize'

import fastclick from 'fastclick'
fastclick.attach(document.body)
Vue.use(MuseUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
