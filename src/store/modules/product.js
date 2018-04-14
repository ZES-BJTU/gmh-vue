import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  products: [],
  productsAll: [],
  productsStoreAll: [],
}

// getters
const getters = {
  getProductById: (state) => (id) => {
    return state.products.find(product => product.id === Number.parseInt(id)) 
  },
  getProductFromAllById: (state) => (id) => {
    return state.productsAll.find(product => product.id === Number.parseInt(id)) 
  },
  getProductFromStoreAllById: (state) => (id) => {
    return state.productsStoreAll.find(product => product.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadProduct({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadProduct', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          products: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadProductAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products/all').then( res => {
        commit('loadProductAll', {
          productsAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  loadProductStoreAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products/store/all').then( res => {
        commit('loadProductStoreAll', {
          productsStoreAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addProduct({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/products',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modProduct({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/products/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delProduct({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/products/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addProductAmount({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/products/amount',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadProduct(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.products = payload.products;
  },
  loadProductAll(state, payload){
    state.productsAll = payload.productsAll;
  },
  loadProductStoreAll(state, payload){
    state.productsStoreAll = payload.productsStoreAll;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
