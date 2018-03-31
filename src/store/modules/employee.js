import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  employees: [],
}

// getters
const getters = {
  getEmployeeById: (state) => (id) => {
    return state.employees.find(employee => employee.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadEmployee({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/employees/search',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadEmployee', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          employees: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addEmployee({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/employees',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modEmployee({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/employees/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delEmployee({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/employees/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  }
}

// mutations
const mutations = {
  loadEmployee(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.employees = payload.employees;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
