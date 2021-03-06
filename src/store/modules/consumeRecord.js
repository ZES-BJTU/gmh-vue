import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  consumeRecords: [],
  consumeRecordsHistory: [],
  consumeRecordPrint: ''
}

// getters
const getters = {
  getConsumeRecordById: (state) => (id) => {
    return state.consumeRecords.find(consumeRecord => consumeRecord.id === Number.parseInt(id)) 
  }
}

// actions
const actions = {
  loadConsumeRecord({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/list' , {
        'keyWords': (info.type === 'search' ? info.content : info.oldContent),
        'consumeType': info.consumeType,
        'projectId': (info.consumeType === 3) ? info.projectId : '',
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadConsumeRecord', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          consumeRecords: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  loadConsumeRecordHistory({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/changedList' , {
        'keyWords': (info.type === 'search' ? info.content : info.oldContent),
        'consumeType': info.consumeType,
        'projectId': (info.consumeType === 3) ? info.projectId : '',
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadConsumeRecordHistory', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          consumeRecordsHistory: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  printConsumeRecord({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/print', info).then( res => {
        commit('printConsumeRecord', {
          consumeRecordPrint: res.data
        });
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  addConsumeRecord({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/createConsume', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modConsumeRecord({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/modifyConsume', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  calConsumeRecord({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/consume/calMoney', info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
}

// mutations
const mutations = {
  loadConsumeRecord(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.consumeRecords = payload.consumeRecords;
  },
  loadConsumeRecordHistory(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.consumeRecordsHistory = payload.consumeRecordsHistory;
  },
  printConsumeRecord(state, payload){
    state.consumeRecordPrint = payload.consumeRecordPrint;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
