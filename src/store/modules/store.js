import httpServer from '@/lib/axios'

const state = {
  stores: []
}

// getters
const getters = {}

// actions
const actions = {
  // loadStore({commit}, info) {
  //   return new Promise((resolve, reject) => {
  //     this.$http({
  //         method: 'post',
  //         url: '/',
  //         data: {
  //           'account': this.signinForm.account,
  //           'password': this.signinForm.password
  //         }
  //       }).then( res => {
  //         resolve(response);
  //       })
  //       .catch( err => {
  //         reject(err);
  //       })
  //   });
  // },
  addStore({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/stores',info).then( res => {
        resolve(response);
      }).catch( error => {
        reject(error);
      })
      // axiosPlugin({
      //     method: 'post',
      //     url: '/stores',
      //     data: {
      //       'name': info.name,
      //       'address': info.address,
      //       'phone': info.phone,
      //       'remark': info.remark
      //     }
      //   }).then( res => {
      //     resolve(response);
      //   })
      //   .catch( err => {
      //     reject(err);
      //   })
    });
  },
  signin({
    commit
  }, info) {
    console.log(info);
    // axios({
    //   method: 'post',
    //   url: '/user/login',
    //   data: {
    //     'account': info.account,
    //     'password': info.password
    //   }
    // }).then(function(res){
    //   this.$router.push({ path: '/home' });
    // })
    // .catch(function(err){
    //   console.log(err)
    // })
    commit('signin', {
      account: '893074711@qq.com',
      name: '章琦',
      token: '12345678',
      status: true
    });
    let $router = info.$router;
    $router.push({
      path: '/home'
    });
  },
  delete({
    commit,
    state
  }, info) {
    console.log(info);
    axios({
      method: 'delete',
      url: '/user/delete/' + info.id
    })
  },
}

// mutations
const mutations = {
  signin(state, payload) {
    // 变更状态
    state.account = payload.account;
    state.name = payload.name;
    state.token = payload.token;
    state.status = payload.status;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
