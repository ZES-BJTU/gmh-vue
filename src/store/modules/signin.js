import * as types from '../mutation-types'

const state = {
  account: '',
  password: ''
}

// getters
const getters = {}

// actions
const actions = {
  signin({commit,state}, info) {
    console.log(info);
    axios({
      method: 'post',
      url: '/user/login',
      data: {
        'account': info.account,
        'password': info.password
      }
    })
  },
  delete({commit,state}, info) {
    console.log(info);
    axios({
      method: 'delete',
      url: '/user/delete/' + info.id
    })
  },
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
