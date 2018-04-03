import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  appointments: [],
}

// getters
const getters = {
  getAppointmentById: (state) => (id) => {
    return state.appointments.find(appointment => appointment.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadAppointment({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/appointment/list' , {
        'appointmentKeyWords': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadAppointment', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          appointments: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addAppointment({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/appointment/create', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modAppointment({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/appointment/modify', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  finishAppointment({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/appointment/finish/', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  cancelAppointment({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/appointment/cancel/',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  getEmployeeTimeTable({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/appointment/queryEmployeeTimeTable',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadAppointment(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.appointments = payload.appointments;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
