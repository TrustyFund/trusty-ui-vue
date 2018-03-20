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
    state.pending = true;
    state.pendingStats = true;
  },
  [FETCH_ASSET_STATS_ERROR](state) {
    state.pending = false;
    state.pendingStats = false;
  },
  [FETCH_ASSET_STATS_COMPLETE](state, { stats }) {
    state.stats = stats;
    state.pending = false;
    state.pendingStats = false;
  },

  [FETCH_ASSET_SOCIAL_REQUEST](state) {
    state.pending = true;
    state.pendingSocial = true;
  },
  [FETCH_ASSET_SOCIAL_ERROR](state) {
    state.pending = false;
    state.pendingSocial = false;
  },
  [FETCH_ASSET_SOCIAL_COMPLETE](state, { social }) {
    state.social = social;
    state.pending = false;
    state.pendingSocial = false;
  },

  [FETCH_ASSET_SNAPSHOT_REQUEST](state) {
    state.pending = true;
    state.pendingSnapShot = true;
  },
  [FETCH_ASSET_SNAPSHOT_ERROR](state) {
    state.pending = false;
    state.pendingSnapShot = false;
  },
  [FETCH_ASSET_SNAPSHOT_COMPLETE](state, { snapShot }) {
    state.snapShot = snapShot;
    state.pending = false;
    state.pendingSnapShot = false;
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
  getPendingStats: state => state.pendingStats,
  getPendingSocial: state => state.pendingSocial,
  getPendingSnapShot: state => state.pendingSnapShot
};


const initialState = {
  stats: statsStub,
  pendingStats: false,
  social: socialStub,
  pendingSocial: false,
  snapShot: snapShotStub,
  pendingSnapShot: false,
  pending: false,
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

