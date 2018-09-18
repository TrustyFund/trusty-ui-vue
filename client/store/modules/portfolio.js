
const TOGGLE_PORTFOLIO_MODE = 'TOGGLE_PORTFOLIO_MODE';
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

const initialState = {
  priceMode: false,
  editMode: false
};

const getters = {
  isPriceMode: state => state.priceMode,
  isEditMode: state => state.editMode
};

const mutations = {
  [TOGGLE_PORTFOLIO_MODE](state) {
    state.priceMode = !state.priceMode;
  },
  [TOGGLE_EDIT_MODE](state) {
    state.editMode = !state.editMode;
  }
};

const actions = {
  togglePriceMode({ commit }) {
    commit(TOGGLE_PORTFOLIO_MODE);
  },
  toggleEditMode({ commit }) {
    commit(TOGGLE_EDIT_MODE);
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};

