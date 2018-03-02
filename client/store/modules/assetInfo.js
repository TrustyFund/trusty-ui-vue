import AssetInfo from './assetInfo';

const SET_STATS = 'SET_STATS';
const SET_SOCIAL = 'SET_SOCIAL';
const SET_SNAPSHOT = 'SET_SNAPSHOT';

const mutations = {
  [SET_STATS](state, stats) {
    state.stats = stats;
  },
  [SET_SOCIAL](state, social) {
    state.social = social;
  },
  [SET_SNAPSHOT](state, snapShot) {
    state.snapShot = snapShot;
  },
};

const actions = {
  fetchStats({ commit }, stats) {

    commit(SET_STATS, stats);
  },
  fetchSocial({ commit }, social) {
    commit(SET_SOCIAL, social);
  },
  fetchSnapshot({ commit }, snapShot) {
    commit(SET_SNAPSHOT, snapShot);
  }
};

const getters = {
  getStats: state => state.stats,
  getSocial: state => state.social,
  getSnapShot: state => state.snapShot,
};


const state = {
  stats: {},
  social: {},
  snapShot: {},
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

