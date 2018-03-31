import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  projectTypes: [],
  projectTypesAll: []
}

// getters
const getters = {
  getProjectTypeById: (state) => (id) => {
    return state.projectTypes.find(projectType => projectTyp.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadProjectType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/projects/types',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadProjectType', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          projectTypes: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadProjectTypeAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/projects/types/all').then( res => {
        commit('loadProjectTypeAll', {
          projectTypesAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addProdjectType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/projects/types',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modProjectType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/projects/types/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delProjectType({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/projects/types/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadProjectType(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.projectTypes = payload.projectTypes;
  },
  loadProjectTypeAll(state, payload){
    state.projectTypesAll = payload.projectTypesAll;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
