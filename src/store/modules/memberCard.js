import httpServer from '@/lib/axios'

const state = {
  pageNum: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
  memberCards: [],
}

// getters
const getters = {
  getMemberCardById: (state) => (id) => {
    return state.memberCards.find(memberCard => memberCard.id === Number.parseInt(id)) 
  },
}

// actions
const actions = {
  loadMemberCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.get('/member/cards',{
        'search': (info.type === 'search' ? info.content : info.oldContent),
        'pageNum': info.pageNum,
        'pageSize': info.pageSize
      }).then( res => {
        commit('loadMemberCard', {
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          totalCount: res.data.totalCount,
          totalPages: res.data.totalPages,
          memberCards: res.data.data
        });
        resolve(res);
      })
      .catch( err => {
        reject(err);
      })
    });
  },
  addMemberCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.post('/member/cards',info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  modMemberCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.put('/member/cards/' + info.id,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  },
  delMemberCard({commit}, info) {
    return new Promise((resolve, reject) => {
      httpServer.del('/member/cards/' + info,info).then( res => {
        resolve(res);
      }).catch( error => {
        reject(error);
      })
    });
  }
}

// mutations
const mutations = {
  loadMemberCard(state, payload){
    state.pageNum = payload.pageNum;
    state.pageSize = payload.pageSize;
    state.totalCount = payload.totalCount;
    state.totalPages = payload.totalPages;
    state.memberCards = payload.memberCards;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
