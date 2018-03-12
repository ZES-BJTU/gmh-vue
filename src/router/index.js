import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import ResetPWD from '@/components/ResetPWD'
import Store from '@/components/content/Store'
import StoreOwner from '@/components/content/StoreOwner'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'store',
          component: Store
        },
        {
          path: 'storeowner',
          component: StoreOwner
        },
      ]
    },{
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/resetpwd',
      name: 'ResetPWD',
      component: ResetPWD
    },
  ]
})
