import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  stockTypes: [],
  stockTypesAll: []
}

// getters
const getters = {
  getStockTypeById: (state) => (id) => {
    return state.stockTypes.find(stockType => stockType.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadStockType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stocks/types',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadStockType', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          stockTypes: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadStockTypeAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stocks/types/all').then( res => {
        commit('loadStockTypeAll', {
          stockTypesAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addStockType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/stocks/types',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modStockType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/stocks/types/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delStockType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/stocks/types/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadStockType(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.stockTypes = payload.stockTypes;
  },
  loadStockTypeAll(state, payload){
    state.stockTypesAll = payload.stockTypesAll;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
