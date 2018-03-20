import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import ResetPWD from '@/components/ResetPWD'
import Store from '@/components/content/Store'
import StoreNew from '@/components/content/StoreNew'
import StoreDetail from '@/components/content/StoreDetail'
import Principal from '@/components/content/Principal'
import PrincipalNew from '@/components/content/PrincipalNew'
import PrincipalDetail from '@/components/content/PrincipalDetail'
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
          path: 'store/new',
          component: StoreNew
        },
        { path: 'store/:id', 
          component: StoreDetail },
        {
          path: 'principal',
          component: Principal
        },
        {
          path: 'principal/new',
          component: PrincipalNew
        },
        {
          path: 'principal/:id',
          component: PrincipalDetail
        },
        {
          path: 'appointment',
          component: Appointment
        },
      ],
      meta: { requiresSignin: true }
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
      component: Time,
      meta: { requiresSignin: true }
    },
  ]
})
