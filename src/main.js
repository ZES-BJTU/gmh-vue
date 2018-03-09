// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import Utils from './lib/utils.js'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Utils)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 如果是去登录或注册，那就先把账户信息移除
  if (to.path === '/') {
    sessionStorage.removeItem("account");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    next();
  }else if (to.path === 'resetpwd') {
    next();
  }else{
    let token = sessionStorage.getItem('token');
    if(!token){
      next({path: '/'});
    }else{
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
