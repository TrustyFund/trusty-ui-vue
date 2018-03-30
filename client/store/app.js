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
  },

  // fetch current user, his assets & market data
  initUserData: async (store) => {
    const { rootGetters } = store;
    const userId = rootGetters['account/getAccountUserId'];

    await Promise.all([
      store.dispatch('assets/fetchDefaultAssets', null, { root: true }),
      store.dispatch('account/fetchCurrentUser', null, { root: true })
    ]);

    const balances = { ...rootGetters['account/getCurrentUserBalances'] };
    const defaultAssetsIds = rootGetters['assets/getDefaultAssetsIds'];
    defaultAssetsIds.forEach(id => {
      if (balances[id]) return;
      balances[id] = { balance: 0 };
    });
    const combinedAssetsIds = Object.keys(balances);
    await store.dispatch('assets/fetchAssets', {
      assets: combinedAssetsIds
    }, { root: true });

    store.dispatch('market/fetchMarketHistory', {
      baseId: '1.3.0',
      assetsIds: combinedAssetsIds,
      days: 1
    }, { root: true });

    store.dispatch('operations/fetchAndSubscribe', { userId, limit: 100 }, { root: true });
    store.dispatch('market/subscribeToMarket', { balances }, { root: true });
  },

  // reset user-related data & unsub from market
  resetUserData(store) {
    const { rootGetters } = store;

    // temporary, move to market
    const balances = { ...rootGetters['account/getCurrentUserBalances'] };
    const defaultAssetsIds = rootGetters['assets/getDefaultAssetsIds'];
    defaultAssetsIds.forEach(id => {
      if (balances[id]) return;
      balances[id] = { balance: 0 };
    });

    store.dispatch('market/unsubscribeFromMarket', { balances }, { root: true });
    store.dispatch('operations/unsubscribeFromUserOperations', null, { root: true });
    store.dispatch('account/clearCurrentUserData', null, { root: true });
    store.dispatch('operations/resetState', null, { root: true });
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
