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
import Reception from '@/components/content/Reception'
import ReceptionNew from '@/components/content/ReceptionNew'
import ReceptionDetail from '@/components/content/ReceptionDetail'
import Operator from '@/components/content/Operator'
import OperatorNew from '@/components/content/OperatorNew'
import OperatorDetail from '@/components/content/OperatorDetail'
import Chart from '@/components/content/Chart'
import Appointment from '@/components/content/Appointment'
import Schedule from '@/components/Schedule'

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
        { // 店铺
          path: 'store',
          component: Store
        },
        { // 新建店铺
          path: 'store/new',
          component: StoreNew
        },
        { // 修改店铺
          path: 'store/:id', 
          component: StoreDetail 
        },
        { // 店铺店长
          path: 'principal',
          component: Principal
        },
        { // 新建店长
          path: 'principal/new',
          component: PrincipalNew
        },
        { // 修改店长
          path: 'principal/:id',
          component: PrincipalDetail
        }, 
        { // 前台
          path: 'reception',
          component: Reception
        },
        { // 新建前台
          path: 'reception/new',
          component: ReceptionNew
        },
        { // 修改前台
          path: 'reception/:id',
          component: ReceptionDetail
        },
        { // 操作员
          path: 'operator',
          component: Operator
        },
        { // 新建操作员
          path: 'operator/new',
          component: OperatorNew
        },
        { // 修改操作员
          path: 'operator/:id',
          component: OperatorDetail
        },
        { // 预约
          path: 'appointment',
          component: Appointment
        },
      ],
      meta: { requiresSignin: true }
    }, 
    { // 登录
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    { // 忘记密码
      path: '/resetpwd',
      name: 'ResetPWD',
      component: ResetPWD
    },
    { 
      path: '/schedule',
      name: 'Schedule',
      component: Schedule,
      meta: { requiresSignin: true }
    },
  ]
})
