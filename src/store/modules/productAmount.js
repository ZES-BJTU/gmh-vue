import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  productAmounts: [],
}

// getters
const getters = {
  getProductAmountById: (state) => (id) => {
    return state.productAmounts.find(productAmount => productAmount.id === Number.parseInt(id)) 
  },
  getProductAmountByPAId: (state) => (id) => {
    return state.productAmounts.find(productAmount => productAmount.productAmountId === Number.parseInt(id)) 
  },
}

// actions
const actions = {
  loadProductAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products/amount',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadProductAmount', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          productAmounts: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  supplyProductAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.patch('/products/amount/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modProductAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/products/amount/' + info.id,info).then( res => {
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
  loadProductAmount(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.productAmounts = payload.productAmounts;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
