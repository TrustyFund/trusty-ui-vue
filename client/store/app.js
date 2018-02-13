const APP_SET_HEADER_TITLE = 'APP_SET_HEADER_TITLE';
const APP_SET_MODAL = 'APP_SET_MODAL';

const actions = {
  setModal({ commit }, val) {
    commit(APP_SET_MODAL, val);
  },
  setHeaderTitle({ commit }, val) {
    commit(APP_SET_HEADER_TITLE, val);
  }
};

const getters = {
  appModal: state => state.modalName,
  appHeaderTitle: state => state.headerTitle,
};

const mutations = {
  [APP_SET_MODAL](state, val) {
    state.modalName = val;
  },
  [APP_SET_HEADER_TITLE](state, val) {
    state.headerTitle = val;
  }
};


const state = {
  modalName: '',
  headerTitle: ''
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
