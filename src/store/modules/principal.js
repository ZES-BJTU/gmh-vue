import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  principals: []
}

// getters
const getters = {
  getPrincipalById: (state) => (id) => {
    return state.principals.find(principal => principal.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadPrincipal({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/users',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadPrincipal', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          principals: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addPrincipal({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/users',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modPrincipal({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/users/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delPrincipal({commit}, info) {
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
  loadPrincipal(state, payload){
    state.pageNum = payload.pageNum
    state.pageSize = payload.pageSize
    state.totalCount = payload.totalCount
    state.totalPages = payload.totalPages
    state.principals = payload.principals
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
