import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  stocks: [],
  stocksAll: []
}

// getters
const getters = {
  getStockById: (state) => (id) => {
    return state.stocks.find(stock => stock.id === Number.parseInt(id)) 
  },
  getStockAllById: (state) => (id) => {
    return state.stocksAll.find(stock => stock.id === Number.parseInt(id)) 
  },
  getStockByName: (state) => (query) => {
    return state.stocksAll.filter(stock => stock.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  },
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
  loadStockAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/stocks/all').then( res => {
        commit('loadStockAll', {
          stocksAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
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
  addStockAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/stocks/amount',info).then( res => {
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
  loadStockAll(state, payload){
    state.stocksAll = payload.stocksAll;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
