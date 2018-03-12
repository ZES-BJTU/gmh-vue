import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import ResetPWD from '@/components/ResetPWD'
import Store from '@/components/content/Store'
import StoreOwner from '@/components/content/StoreOwner'
import Chart from '@/components/content/Chart'
import Appointment from '@/components/content/Appointment'
import Time from '@/components/content/Time'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
          path: 'chart',
          component: Chart
        },
        {
          path: 'store',
          component: Store
        },
        {
          path: 'storeowner',
          component: StoreOwner
        },
        {
          path: 'appointment',
          component: Appointment
        },
      ]
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/resetpwd',
      name: 'ResetPWD',
      component: ResetPWD
    },
    {
      path: '/time',
      name: 'Time',
      component: Time
    },
  ]
})
