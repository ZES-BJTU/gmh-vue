import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  stores: []
}

// getters
const getters = {
  getStoreById: (state) => (id) => {
    return state.stores.find(store => store.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadStore({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stores',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadStore', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          stores: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addStore({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/stores',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modStore({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/stores/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delStore({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/stores/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
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
  },
  loadStore(state, payload){
    state.pageNum = payload.pageNum
    state.pageSize = payload.pageSize
    state.totalCount = payload.totalCount
    state.totalPages = payload.totalPages
    state.stores = payload.stores
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
