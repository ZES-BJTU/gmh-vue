import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  customerCards: [],
  customerCardsAll: [],
  customerCardPay: [],
  customerCardChanges: [],
}

// getters
const getters = {
  getCustomerCardById: (state) => (id) => {
    return state.customerCards.find(customerCard => customerCard.id === Number.parseInt(id)) 
  },
  getCustomerCardFromAllById: (state) => (id) => {
    return state.customerCardsAll.find(customerCard => customerCard.id === Number.parseInt(id)) 
  },
  getCustomerCardPayById: (state) => (id) => {
    return state.customerCardPay.find(customerCard => customerCard.id === Number.parseInt(id)) 
  },
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
  loadCustomerCardAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/customerMemberCard/all').then( res => {
        commit('loadCustomerCardAll', {
          customerCardsAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  loadCustomerCardPay({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/getCardPay',{
        'customerMobile': info.customerMobile,
        'paymentWay': info.paymentWay // 1 会员卡去除代金券, 31 会员卡代金券
      }).then( res => {
        commit('loadCustomerCardPay', {
          customerCardPay: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  loadCustomerCardChangeList({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/changedList', {
        'keyWords': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadCustomerCardChangeList', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          customerCardChanges: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  chargeCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/recharge', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  buyCustomerCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerMemberCard/buyProject', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
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
  loadCustomerCardAll(state, payload){
    state.customerCardsAll = payload.customerCardsAll;
  },
  loadCustomerCardPay(state, payload){
    state.customerCardPay = payload.customerCardPay;
  },
  loadCustomerCardChangeList(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.customerCardChanges = payload.customerCardChanges;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
