const APP_SET_MODAL = 'APP_SET_MODAL';
const APP_INIT = 'APP_INIT';

const actions = {
  setModal({ commit }, val) {
    commit(APP_SET_MODAL, val);
  },
  initApp(store) {
    const { commit } = store;
    store.dispatch('account/checkCachedUserData', null, { root: true });
    store.dispatch('connection/initConnection', null, { root: true });
    commit(APP_INIT);
  }
};

const getters = {
  getModalName: state => state.modalName,
};

const mutations = {
  [APP_SET_MODAL](state, modalName) {
    state.modalName = modalName;
  },
  [APP_INIT]() {
  }
};


const state = {
  modalName: ''
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
