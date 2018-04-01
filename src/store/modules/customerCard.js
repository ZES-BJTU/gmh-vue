import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  customerCards: [],
}

// getters
const getters = {
  getCustomerCardById: (state) => (id) => {
    return state.customerCards.find(customerCard => customerCard.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/list', {
        'keyWords': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadCustomerCard', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          customerCards: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  returnCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/return', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  turnCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/turn', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  changeStoreCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/changeStore', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadCustomerCard(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.customerCards = payload.customerCards;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
