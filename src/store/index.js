import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as actions from './actions'
import signin from './modules/signin'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8080';

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
      signin,
  }
})