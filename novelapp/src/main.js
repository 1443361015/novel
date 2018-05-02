// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import qs from 'qs';

Vue.config.productionTip = false
Vue.config.debug = true;
axios.defaults.withCredentials=true;
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;
//开启debug模式


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
