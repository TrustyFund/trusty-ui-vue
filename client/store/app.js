const APP_SET_MODAL = 'APP_SET_MODAL';

const actions = {
  setModal({ commit }, val) {
    commit(APP_SET_MODAL, val);
  },
};

const getters = {
  getModalName: state => state.modalName,
};

const mutations = {
  [APP_SET_MODAL](state, modalName) {
    state.modalName = modalName;
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
