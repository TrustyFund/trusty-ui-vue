
const TOGGLE_PORTFOLIO_MODE = 'TOGGLE_PORTFOLIO_MODE';

const initialState = {
  priceMode: false
};


const getters = {
  isPriceMode: state => state.priceMode
};

const mutations = {
  [TOGGLE_PORTFOLIO_MODE](state) {
    state.priceMode = !state.priceMode;
  }
};

const actions = {
  togglePriceMode({ commit }) {
    commit(TOGGLE_PORTFOLIO_MODE);
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};

