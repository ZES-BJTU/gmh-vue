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
import StockType from '@/components/content/StockType'
import StockTypeNew from '@/components/content/StockTypeNew'
import StockTypeDetail from '@/components/content/StockTypeDetail'
import Stock from '@/components/content/Stock'
import StockNew from '@/components/content/StockNew'
import StockDetail from '@/components/content/StockDetail'
import StockNewAmount from '@/components/content/StockNewAmount'
import StockAmount from '@/components/content/StockAmount'
import StockAmountSupply from '@/components/content/StockAmountSupply'
import StockAmountDetail from '@/components/content/StockAmountDetail'
import ProductType from '@/components/content/ProductType'
import ProductTypeNew from '@/components/content/ProductTypeNew'
import ProductTypeDetail from '@/components/content/ProductTypeDetail'
import Product from '@/components/content/Product'
import ProductNew from '@/components/content/ProductNew'
import ProductDetail from '@/components/content/ProductDetail'
import ProductNewAmount from '@/components/content/ProductNewAmount'
import ProductAmount from '@/components/content/ProductAmount'
import ProductAmountSupply from '@/components/content/ProductAmountSupply'
import ProductAmountDetail from '@/components/content/ProductAmountDetail'
import Customer from '@/components/content/Customer'
import CustomerNew from '@/components/content/CustomerNew'
import CustomerDetail from '@/components/content/CustomerDetail'
import Employee from '@/components/content/Employee'
import EmployeeNew from '@/components/content/EmployeeNew'
import EmployeeDetail from '@/components/content/EmployeeDetail'
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
        { // 库存分类
          path: 'stocktype',
          component: StockType
        },
        { // 新建库存分类
          path: 'stocktype/new',
          component: StockTypeNew
        },
        { // 修改库存分类
          path: 'stocktype/:id',
          component: StockTypeDetail
        },
        { // 库存
          path: 'stock',
          component: Stock
        },
        { // 新建库存
          path: 'stock/new',
          component: StockNew
        },
        { // 修改库存
          path: 'stock/:id',
          component: StockDetail
        },
        { // 新建库存数量
          path: 'stock/newamount/:id',
          component: StockNewAmount
        },
        { // 库存数量
          path: 'stockamount',
          component: StockAmount
        },
        { // 补充库存数量
          path: 'stockamountsupply/:id',
          component: StockAmountSupply
        },
        { // 修改库存数量
          path: 'stockamountdetail/:id',
          component: StockAmountDetail
        },
        { // 产品分类
          path: 'producttype',
          component: ProductType
        },
        { // 新建产品分类
          path: 'producttype/new',
          component: ProductTypeNew
        },
        { // 修改产品分类
          path: 'producttype/:id',
          component: ProductTypeDetail
        },
        { // 产品
          path: 'product',
          component: Product
        },
        { // 新建产品
          path: 'product/new',
          component: ProductNew
        },
        { // 修改产品
          path: 'product/:id',
          component: ProductDetail
        },
        { // 新建产品数量
          path: 'product/newamount/:id',
          component: ProductNewAmount
        },
        { // 产品数量
          path: 'productamount',
          component: ProductAmount
        },
        { // 补充产品数量
          path: 'productamountsupply/:id',
          component: ProductAmountSupply
        },
        { // 修改产品数量
          path: 'productamountdetail/:id',
          component: ProductAmountDetail
        },
        { // 客户
          path: 'customer',
          component: Customer
        },
        { // 新建客户
          path: 'customer/new',
          component: CustomerNew
        },
        { // 修改客户
          path: 'customer/:id',
          component: CustomerDetail
        },
        { // 员工
          path: 'employee',
          component: Employee
        },
        { // 新建员工
          path: 'employee/new',
          component: EmployeeNew
        },
        { // 修改员工
          path: 'employee/:id',
          component: EmployeeDetail
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
