import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  stockAmounts: [],
}

// getters
const getters = {
  getStockAmountById: (state) => (id) => {
    return state.stockAmounts.find(stockAmount => stockAmount.id === Number.parseInt(id)) 
  },
  getStockAmountBySAId: (state) => (id) => {
    return state.stockAmounts.find(stockAmount => stockAmount.stockAmountId === Number.parseInt(id)) 
  },
}

// actions
const actions = {
  loadStockAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stocks/amount',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadStock', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          stockAmounts: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  supplyStockAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.patch('/stocks/amount/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  convertStockAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.patch('/stocks/amount/convert/' + info.stockId,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modStockAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/stocks/amount/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  // delStock({commit}, info) {
  //   return new Promise((resolve, reject) => {
  //     httpServer.del('/stocks/' + info,info).then( res => {
  //       resolve(res);
  //     }).catch( error => {
  //       reject(error);
  //     })
  //   });
  // },
}

// mutations
const mutations = {
  loadStock(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.stockAmounts = payload.stockAmounts;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
