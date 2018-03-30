import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  customers: [],
}

// getters
const getters = {
  getCustomerById: (state) => (id) => {
    return state.customers.find(customer => customer.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadCustomer({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customer/list' , {
        'keyWords': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadCustomer', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          customers: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addCustomer({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customer/create' , info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modCustomer({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customer/modify' , info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delCustomer({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/customer/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadCustomer(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.customers = payload.customers;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
