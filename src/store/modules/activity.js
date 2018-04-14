import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  activities: [],
}

// getters
const getters = {
  getActivityById: (state) => (id) => {
    return state.activities.find(activity => activity.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadActivity({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/activities',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadActivity', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          activities: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadActivityAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/activities/all').then( res => {
        commit('loadActivityAll', {
          activitiesAll: res.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addActivity({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/activities',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modActivity({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/activities/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  // delEmployee({commit}, info) {
  //   return new Promise((resolve, reject) => {
  //     httpServer.del('/employees/' + info,info).then( res => {
  //       resolve(res);
  //     }).catch( error => {
  //       reject(error);
  //     })
  //   });
  // }
}

// mutations
const mutations = {
  loadActivity(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.activities = payload.activities;
  },
  loadActivityAll(state, payload){
    state.activitiesAll = payload.activitiesAll;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
