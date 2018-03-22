import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  stocks: [],
}

// getters
const getters = {
  getStockById: (state) => (id) => {
    return state.stocks.find(stock => stock.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadStock({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stocks',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadStock', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          stocks: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addStock({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/stocks',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modStock({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/stocks/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delStock({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/stocks/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadStock(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.stocks = payload.stocks;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
