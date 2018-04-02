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
const CANCEL_ASSET_REQUEST = 'CANCEL_ASSET_REQUEST';

const statsStub = {};

const descriptionStub = {};
const technologyStub = {};
const featuresStub = {};
const icoStub = {};

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
  [FETCH_ASSET_SNAPSHOT_COMPLETE](
    state,
    { description, features, technology, ico }
  ) {
    state.description = description;
    state.features = features;
    state.technology = technology;
    state.ico = ico;
    state.pending = false;
    state.pendingSnapShot = false;
  },

  [RESET_ASSET_INFO](state) {
    state.stats = {};
    state.social = {};
    state.description = {};
    state.technology = {};
    state.features = {};
    state.ico = {};
    state.penging = false;
  },

  [CANCEL_ASSET_REQUEST](state) {
    state.penging = false;
    state.pendingStats = false;
    state.pendingSocial = false;
    state.pendingSnapShot = false;
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
    console.log(result);
    if (result.success) {
      commit(FETCH_ASSET_SNAPSHOT_COMPLETE, {
        description: result.data.description,
        features: result.data.features,
        technology: result.data.technology,
        ico: result.data.ico
      });
    } else {
      commit(FETCH_ASSET_SNAPSHOT_ERROR);
    }
    return result;
  },

  resetData({ commit }) {
    commit(RESET_ASSET_INFO);
  },

  cancelRequests({ commit }) {
    AssetInfo.cancelRequests();
    commit(CANCEL_ASSET_REQUEST);
  }
};

const getters = {
  getStats: state => state.stats,
  getSocial: state => state.social,
  getDescription: state => state.description,
  getFeatures: state => state.features,
  getTechnology: state => state.technology,
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
  description: descriptionStub,
  features: featuresStub,
  technology: technologyStub,
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

