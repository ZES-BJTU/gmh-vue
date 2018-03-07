import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import account from './modules/account'
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
  }
})