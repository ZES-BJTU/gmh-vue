import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  customerActivities: [],
  customerActivitiesAll: [],
  customerActivityPay: [],
}

// getters
const getters = {
  getCustomerActivityById: (state) => (id) => {
    return state.customerActivities.find(customerActivity => customerActivity.id === Number.parseInt(id)) 
  },
  getCustomerActivityFromAllById: (state) => (id) => {
    return state.customerActivitiesAll.find(customerActivity => customerActivity.id === Number.parseInt(id)) 
  },
  getCustomerActivityPayById: (state) => (id) => {
    return state.customerActivityPay.find(customerActivity => customerActivity.id === Number.parseInt(id)) 
  },
}

// actions
const actions = {
  loadCustomerActivity({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerActivity/list', {
        'keyWord': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadCustomerActivity', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          customerActivities: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadCustomerActivityPay({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/customerActivity/getActivityPay',{
        'customerMobile': info.customerMobile,
        'paymentWay': info.paymentWay // 2 活动去除代金券, 32 活动代金券
      }).then( res => {
        commit('loadCustomerActivityPay', {
          customerActivityPay: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadCustomerActivity(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.customerActivities = payload.customerActivities;
  },
  loadCustomerActivityPay(state, payload){
    state.customerActivityPay = payload.customerActivityPay;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
