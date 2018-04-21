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
// import axiosPlugin from "./lib/axios"; 
// Vue.use(axiosPlugin);

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Utils)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    alert('没有匹配到路由：'+to.fullPath);
    from.name ? next({name: from.name}) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
  if (to.matched.some(record => record.meta.requiresSignin)) {
    //该路由需要验证是否登陆。如果没有，导航到登录页
    let token = sessionStorage.getItem('token');
    if (!token) {
      next({
        path: '/signin'
      });
    } else {
      next();
    }
  } else {
    if (to.path === '/signin') {
      //如果是去登录，那就先把账户信息移除
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
