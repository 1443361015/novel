import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import regist from '@/pages/regist'
import resetPass from '@/pages/resetPass'
import home from '@/pages/home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/resetPass',
      name: 'resetPass',
      component: resetPass
    }
  ]
})
