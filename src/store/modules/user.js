import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  users: []
}

// getters
const getters = {
  getUserById: (state) => (id) => {
    return state.users.find(user => user.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadUser({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/users',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize,
        'role': info.role
      }).then( res => {
        commit('loadUser', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          users: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addUser({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/users',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modUser({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/users/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modPWD({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.patch('/users/changePassword',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delUser({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/users/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadUser(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.users = payload.users;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
