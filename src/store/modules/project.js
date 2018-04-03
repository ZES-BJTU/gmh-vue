import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  projects: [],
  projectsAll: [],
}

// getters
const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find(project => project.id === Number.parseInt(id)) 
  },
  getProjectFromAllById: (state) => (id) => {
    return state.projectsAll.find(project => project.id === Number.parseInt(id)) 
  },
}

// actions
const actions = {
  loadProject({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/projects',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadProject', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          projects: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadProjectAll({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/projects/all').then( res => {
        commit('loadProjectAll', {
          projectsAll: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addProject({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/projects',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modProject({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/projects/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delProject({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/projects/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadProject(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.projects = payload.projects;
  },
  loadProjectAll(state, payload){
    state.projectsAll = payload.projectsAll;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
