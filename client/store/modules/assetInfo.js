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

const statsStub = {};

const snapShotStub = {};

const socialStub = {};

const icoStub = {};

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
  [FETCH_ASSET_SNAPSHOT_COMPLETE](state, { snapShot, ico }) {
    state.snapShot = snapShot;
    state.ico = ico;
    state.pending = false;
    state.pendingSnapShot = false;
  },
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
      commit(FETCH_ASSET_SNAPSHOT_COMPLETE, {
        snapShot: result.data.snapShot, ico: result.data.ico
      });
    } else {
      commit(FETCH_ASSET_SNAPSHOT_ERROR);
    }
    return result;
  }
};

const getters = {
  getStats: state => state.stats,
  getSocial: state => state.social,
  getSnapShot: state => state.snapShot,
  getICO: state => state.ico,
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
  ico: icoStub,
  penging: false,
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};

