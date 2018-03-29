import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  productTypes: [],
  productTypesAll: []
}

// getters
const getters = {
  getProductTypeById: (state) => (id) => {
    return state.productTypes.find(productType => productType.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadProductType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products/types',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadProductType', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          productTypes: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadProductTypeAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/products/types/all').then( res => {
        commit('loadProductTypeAll', {
          productTypesAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addProductType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/products/types',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modProductType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/products/types/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delProductType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/products/types/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadProductType(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.productTypes = payload.productTypes;
  },
  loadProductTypeAll(state, payload){
    state.productTypesAll = payload.productTypesAll;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
