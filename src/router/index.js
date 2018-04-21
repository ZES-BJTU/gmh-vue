import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import ResetPWD from '@/components/ResetPWD'
import Store from '@/components/content/Store/Store'
import StoreNew from '@/components/content/Store/StoreNew'
import StoreDetail from '@/components/content/Store/StoreDetail'
import Principal from '@/components/content/Principal/Principal'
import PrincipalNew from '@/components/content/Principal/PrincipalNew'
import PrincipalDetail from '@/components/content/Principal/PrincipalDetail'
import Reception from '@/components/content/Reception/Reception'
import ReceptionNew from '@/components/content/Reception/ReceptionNew'
import ReceptionDetail from '@/components/content/Reception/ReceptionDetail'
import Operator from '@/components/content/Operator/Operator'
import OperatorNew from '@/components/content/Operator/OperatorNew'
import OperatorDetail from '@/components/content/Operator/OperatorDetail'
import StockType from '@/components/content/StockType/StockType'
import StockTypeNew from '@/components/content/StockType/StockTypeNew'
import StockTypeDetail from '@/components/content/StockType/StockTypeDetail'
import Stock from '@/components/content/Stock/Stock'
import StockNew from '@/components/content/Stock/StockNew'
import StockDetail from '@/components/content/Stock/StockDetail'
import StockNewAmount from '@/components/content/Stock/StockNewAmount'
import StockAmount from '@/components/content/StockAmount/StockAmount'
import StockAmountSupply from '@/components/content/StockAmount/StockAmountSupply'
import StockAmountConvert from '@/components/content/StockAmount/StockAmountConvert'
import StockAmountDetail from '@/components/content/StockAmount/StockAmountDetail'
import ProductType from '@/components/content/ProductType/ProductType'
import ProductTypeNew from '@/components/content/ProductType/ProductTypeNew'
import ProductTypeDetail from '@/components/content/ProductType/ProductTypeDetail'
import Product from '@/components/content/Product/Product'
import ProductNew from '@/components/content/Product/ProductNew'
import ProductDetail from '@/components/content/Product/ProductDetail'
import ProductNewAmount from '@/components/content/Product/ProductNewAmount'
import ProductAmount from '@/components/content/ProductAmount/ProductAmount'
import ProductAmountSupply from '@/components/content/ProductAmount/ProductAmountSupply'
import ProductAmountConvert from '@/components/content/ProductAmount/ProductAmountConvert'
import ProductAmountConvertEach from '@/components/content/ProductAmount/ProductAmountConvertEach'
import ProductAmountDetail from '@/components/content/ProductAmount/ProductAmountDetail'
import Customer from '@/components/content/Customer/Customer'
import CustomerNew from '@/components/content/Customer/CustomerNew'
import CustomerDetail from '@/components/content/Customer/CustomerDetail'
import Employee from '@/components/content/Employee/Employee'
import EmployeeNew from '@/components/content/Employee/EmployeeNew'
import EmployeeDetail from '@/components/content/Employee/EmployeeDetail'
import ProjectType from '@/components/content/ProjectType/ProjectType'
import ProjectTypeNew from '@/components/content/ProjectType/ProjectTypeNew'
import ProjectTypeDetail from '@/components/content/ProjectType/ProjectTypeDetail'
import Project from '@/components/content/Project/Project'
import ProjectNew from '@/components/content/Project/ProjectNew'
import ProjectDetail from '@/components/content/Project/ProjectDetail'
import MemberCard from '@/components/content/MemberCard/MemberCard'
import MemberCardNew from '@/components/content/MemberCard/MemberCardNew'
import MemberCardDetail from '@/components/content/MemberCard/MemberCardDetail'
import CustomerCard from '@/components/content/CustomerCard/CustomerCard'
import CustomerCardCharge from '@/components/content/CustomerCard/CustomerCardCharge'
import CustomerCardChangeTime from '@/components/content/CustomerCard/CustomerCardChangeTime'
import CustomerCardBuy from '@/components/content/CustomerCard/CustomerCardBuy'
import CustomerCardReturn from '@/components/content/CustomerCard/CustomerCardReturn'
import CustomerCardTurn from '@/components/content/CustomerCard/CustomerCardTurn'
import CustomerCardChangeStore from '@/components/content/CustomerCard/CustomerCardChangeStore'
import CustomerCardChangeRecord from '@/components/content/CustomerCard/CustomerCardChangeRecord'
import CustomerActivity from '@/components/content/CustomerActivity/CustomerActivity'
import Activity from '@/components/content/Activity/Activity'
import ActivityNew from '@/components/content/Activity/ActivityNew'
import ActivityDetail from '@/components/content/Activity/ActivityDetail'
import Chart from '@/components/content/Chart'
import Appointment from '@/components/content/Appointment/Appointment'
import AppointmentNew from '@/components/content/Appointment/AppointmentNew'
import AppointmentDetail from '@/components/content/Appointment/AppointmentDetail'
import AppointmentFinish from '@/components/content/Appointment/AppointmentFinish'
import ConsumeRecordCard from '@/components/content/ConsumeRecord/ConsumeRecordCard'
import ConsumeRecordNewCard from '@/components/content/ConsumeRecord/ConsumeRecordNewCard'
import ConsumeRecordCardDetail from '@/components/content/ConsumeRecord/ConsumeRecordCardDetail'
import ConsumeRecordProduct from '@/components/content/ConsumeRecord/ConsumeRecordProduct'
import ConsumeRecordNewProduct from '@/components/content/ConsumeRecord/ConsumeRecordNewProduct'
import ConsumeRecordProductDetail from '@/components/content/ConsumeRecord/ConsumeRecordProductDetail'
import ConsumeRecordProject from '@/components/content/ConsumeRecord/ConsumeRecordProject'
import ConsumeRecordNewProject from '@/components/content/ConsumeRecord/ConsumeRecordNewProject'
import ConsumeRecordProjectDetail from '@/components/content/ConsumeRecord/ConsumeRecordProjectDetail'
import ConsumeRecordActivity from '@/components/content/ConsumeRecord/ConsumeRecordActivity'
import ConsumeRecordNewActivity from '@/components/content/ConsumeRecord/ConsumeRecordNewActivity'
import ConsumeRecordActivityDetail from '@/components/content/ConsumeRecord/ConsumeRecordActivityDetail'
import Schedule from '@/components/Schedule'
import PrintCardRecord from '@/components/PrintCardRecord'
import PrintProductRecord from '@/components/PrintProductRecord'
import PrintProjectRecord from '@/components/PrintProjectRecord'
import PrintActivityRecord from '@/components/PrintActivityRecord'
import ModPWD from '@/components/content/ModPWD'
import { print } from 'util';

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
          path: 'stock-type',
          component: StockType
        },
        { // 新建库存分类
          path: 'stock-type/new',
          component: StockTypeNew
        },
        { // 修改库存分类
          path: 'stock-type/:id',
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
          path: 'stock/new-amount/:id',
          component: StockNewAmount
        },
        { // 库存数量
          path: 'stock-amount',
          component: StockAmount
        },
        { // 补充库存数量
          path: 'stock-amount-supply/:id',
          component: StockAmountSupply
        },
        { // 库存数量转店
          path: 'stock-amount-convert/:id',
          component: StockAmountConvert
        },
        { // 修改库存数量
          path: 'stock-amount-detail/:id',
          component: StockAmountDetail
        },
        { // 产品分类
          path: 'product-type',
          component: ProductType
        },
        { // 新建产品分类
          path: 'product-type/new',
          component: ProductTypeNew
        },
        { // 修改产品分类
          path: 'product-type/:id',
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
          path: 'product/new-amount/:id',
          component: ProductNewAmount
        },
        { // 产品数量
          path: 'product-amount',
          component: ProductAmount
        },
        { // 补充产品数量
          path: 'product-amount-supply/:id',
          component: ProductAmountSupply
        },
        { // 产品数量转店
          path: 'product-amount-convert/:id',
          component: ProductAmountConvert
        },
        { // 产品库存转化
          path: 'product-amount-convert-each',
          component: ProductAmountConvertEach
        },
        { // 修改产品数量
          path: 'product-amount-detail/:id',
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
        { // 美容项目分类
          path: 'project-type',
          component: ProjectType
        },
        { // 新建美容项目分类
          path: 'project-type/new',
          component: ProjectTypeNew
        },
        { // 修改美容项目分类
          path: 'project-type/:id',
          component: ProjectTypeDetail
        },
        { // 美容项目
          path: 'project',
          component: Project
        },
        { // 新建美容项目
          path: 'project/new',
          component: ProjectNew
        },
        { // 修改美容项目
          path: 'project/:id',
          component: ProjectDetail
        },
        { // 会员卡
          path: 'member-card',
          component: MemberCard
        },
        { // 新建会员卡
          path: 'member-card/new',
          component: MemberCardNew
        },
        { // 修改会员卡
          path: 'member-card/:id',
          component: MemberCardDetail
        },
        { // 客户会员卡
          path: 'customer-card',
          component: CustomerCard
        },
        { // 客户会员卡充值
          path: 'customer-card-charge/:id',
          component: CustomerCardCharge
        },
        { // 客户会员卡改期
          path: 'customer-card-change-time/:id',
          component: CustomerCardChangeTime
        },
        { // 客户会员卡换疗程
          path: 'customer-card-buy/:id',
          component: CustomerCardBuy
        },
        { // 客户会员卡退卡
          path: 'customer-card-return/:id',
          component: CustomerCardReturn
        },
        { // 客户会员卡转卡
          path: 'customer-card-turn/:id',
          component: CustomerCardTurn
        },
        { // 客户会员卡转店
          path: 'customer-card-change-store/:id',
          component: CustomerCardChangeStore
        },
        { // 客户活动
          path: 'customer-activity',
          component: CustomerActivity
        },
        { // 活动
          path: 'activity',
          component: Activity
        },
        { // 新建活动
          path: 'activity/new',
          component: ActivityNew
        },
        { // 修改活动
          path: 'activity/:id',
          component: ActivityDetail
        },
        { // 客户会员卡退换记录
          path: 'customer-card-change-record',
          component: CustomerCardChangeRecord
        },
        { // 预约
          path: 'appointment',
          component: Appointment
        },
        { // 新建预约
          path: 'appointment/new',
          component: AppointmentNew
        },
        { // 修改预约
          path: 'appointment-detail/:id',
          component: AppointmentDetail
        },
        { // 完成预约
          path: 'appointment-finish/:id',
          component: AppointmentFinish
        },
        { // 消费记录办卡
          path: 'consume-record-card',
          component: ConsumeRecordCard
        },
        { // 办卡
          path: 'consume-record-card/new-card',
          component: ConsumeRecordNewCard
        },
        { // 修改办卡消费记录
          path: 'consume-record-card/:id',
          component: ConsumeRecordCardDetail
        },
        { // 消费记录产品
          path: 'consume-record-product',
          component: ConsumeRecordProduct
        },
        { // 买产品
          path: 'consume-record-product/new-product',
          component: ConsumeRecordNewProduct
        },
        { // 修改买产品消费记录
          path: 'consume-record-product/:id',
          component: ConsumeRecordProductDetail
        },
        { // 消费记录项目
          path: 'consume-record-project',
          component: ConsumeRecordProject
        },
        { // 做项目
          path: 'consume-record-project/new-project',
          component: ConsumeRecordNewProject
        },
        { // 修改做项目消费记录
          path: 'consume-record-project/:id',
          component: ConsumeRecordProjectDetail
        },
        { // 消费记活动
          path: 'consume-record-activity',
          component: ConsumeRecordActivity
        },
        { // 买活动
          path: 'consume-record-activity/new-activity',
          component: ConsumeRecordNewActivity
        },
        { // 修改买活动消费记录
          path: 'consume-record-activity/:id',
          component: ConsumeRecordActivityDetail
        },
        { // 修改密码
          path: 'modpwd',
          component: ModPWD
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
    { // 办卡记录打印
      path: '/print-card-record',
      component: PrintCardRecord
    },
    { // 买产品记录打印
      path: '/print-product-record',
      component: PrintProductRecord
    },
    { // 做项目记录打印
      path: '/print-project-record',
      component: PrintProjectRecord
    },
    { // 参加活动记录打印
      path: '/print-activity-record',
      component: PrintActivityRecord
    },
  ]
})
