/* eslint max-len: ["error", { "ignoreStrings": true }] */

import AssetInfo from '@/services/assetInfo';

const FETCH_ASSET_STATS_REQUEST = 'FETCH_ASSET_STATS_REQUEST';
const FETCH_ASSET_STATS_COMPLETE = 'FETCH_ASSET_STATS_COMPLETE';
const FETCH_ASSET_STATS_ERROR = 'FETCH_ASSET_STATS_ERROR';

const FETCH_ASSET_SOCIAL_REQUEST = 'FETCH_ASSET_SOCIAL_REQUEST';
const FETCH_ASSET_SOCIAL_COMPLETE = 'FETCH_ASSET_SOCIAL_COMPLETE';
const FETCH_ASSET_SOCIAL_ERROR = 'FETCH_ASSET_SOCIAL_ERROR';

const FETCH_ASSET_SNAPSHOT_REQUEST = 'FETCH_ASSET_SNAPSHOT_REQUEST';
const FETCH_ASSET_SNAPSHOT_COMPLETE = 'FETCH_ASSET_SNAPSHOT_COMPLETE';
const FETCH_ASSET_SNAPSHOT_ERROR = 'FETCH_ASSET_SNAPSHOT_ERROR';

const RESET_ASSET_INFO = 'RESET_ASSET_INFO';

const statsStub = {};

const snapShotStub = {};

const socialStub = {};


const mutations = {
  [FETCH_ASSET_STATS_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_STATS_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_STATS_COMPLETE](state, { stats }) {
    state.stats = stats;
    state.penging = false;
  },

  [FETCH_ASSET_SOCIAL_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_SOCIAL_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_SOCIAL_COMPLETE](state, { social }) {
    state.social = social;
    state.penging = false;
  },

  [FETCH_ASSET_SNAPSHOT_REQUEST](state) {
    state.penging = true;
  },
  [FETCH_ASSET_SNAPSHOT_ERROR](state) {
    state.penging = false;
  },
  [FETCH_ASSET_SNAPSHOT_COMPLETE](state, { snapShot }) {
    state.snapShot = snapShot;
    state.penging = false;
  },
  [RESET_ASSET_INFO](state) {
    state.stats = {};
    state.social = {};
    state.snapShot = {};
    state.penging = false;
  }
};

const actions = {
  async fetchStats({ commit }, assetSymbol) {
    commit(FETCH_ASSET_STATS_REQUEST);
    const result = await AssetInfo.getStats(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_STATS_COMPLETE, { stats: result.data });
    } else {
      commit(FETCH_ASSET_STATS_ERROR);
    }
    return result;
  },

  async fetchSocial({ commit }, assetSymbol) {
    commit(FETCH_ASSET_SOCIAL_REQUEST);
    const result = await AssetInfo.getSocialStats(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_SOCIAL_COMPLETE, { social: result.data });
    } else {
      commit(FETCH_ASSET_SOCIAL_ERROR);
    }
    return result;
  },

  async fetchSnapshot({ commit }, assetSymbol) {
    commit(FETCH_ASSET_SNAPSHOT_REQUEST);
    const result = await AssetInfo.getCoinSnapshot(assetSymbol);
    if (result.success) {
      commit(FETCH_ASSET_SNAPSHOT_COMPLETE, { snapShot: result.data });
    } else {
      commit(FETCH_ASSET_SNAPSHOT_ERROR);
    }
    return result;
  },

  resetData({ commit }) {
    commit(RESET_ASSET_INFO);
  }
};

const getters = {
  getStats: state => state.stats,
  getSocial: state => state.social,
  getSnapShot: state => state.snapShot,
};


const initialState = {
  stats: statsStub,
  social: socialStub,
  snapShot: snapShotStub,
  penging: false,
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

