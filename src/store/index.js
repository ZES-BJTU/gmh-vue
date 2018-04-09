import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import account from './modules/account'
import user from './modules/user'
import store from './modules/store'
import stockType from './modules/stockType'
import stock from './modules/stock'
import stockAmount from './modules/stockAmount'
import productType from './modules/productType'
import product from './modules/product'
import productAmount from './modules/productAmount'
import customer from './modules/customer'
import employee from './modules/employee'
import projectType from './modules/projectType'
import project from './modules/project'
import memberCard from './modules/memberCard'
import customerCard from './modules/customerCard'
import appointment from './modules/appointment'
import activity from './modules/activity'
import consumeRecord from './modules/consumeRecord'
import * as actions from './actions'
import mutations from './mutations'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8080';

Vue.use(Vuex)

export default new Vuex.Store({
  actions: actions,
  mutations: mutations,
  modules: {
    account,
    store,
    user,
    stockType,
    stock,
    stockAmount,
    productType,
    product,
    productAmount,
    customer,
    employee,
    projectType,
    project,
    memberCard,
    customerCard,
    appointment,
    activity,
    consumeRecord
  }
})