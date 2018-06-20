const APP_SET_MODAL = 'APP_SET_MODAL';
const APP_INIT = 'APP_INIT';
const SHOW_HEADER = 'SHOW_HEADER';
const HIDE_HEADER = 'HIDE_HEADER';

const actions = {
  showHeader({ commit }) {
    commit(SHOW_HEADER);
  },
  hideHeader({ commit }) {
    commit(HIDE_HEADER);
  },
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
      store.dispatch('account/fetchCurrentUser', null, { root: true }),
      store.dispatch('operations/fetchAndSubscribe', { userId, limit: 50 }, { root: true })
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


    const baseId = '1.3.0';

    store.dispatch('history/fetch', {
      baseId,
      assetsIds: combinedAssetsIds,
      days: 1
    }, { root: true });

    store.dispatch('history/fetch', {
      baseId,
      assetsIds: combinedAssetsIds,
      days: 7
    }, { root: true });

    store.dispatch('transactions/fetchComissions', null, { root: true });
    store.dispatch('market/subscribeToMarket', { balances }, { root: true });
  },

  // reset user-related data & unsub from market
  resetUserData(store) {
    const { rootGetters } = store;

    // temporary, move to market
    const balances = { ...rootGetters['account/getCurrentUserBalances'] };
    const defaultAssetsIds = rootGetters['assets/getDefaultAssetsIds'];
    const baseId = rootGetters['market2/getSystemBaseId'];
    defaultAssetsIds.forEach(id => {
      if (balances[id]) return;
      balances[id] = { balance: 0 };
    });

    store.dispatch('market2/unsubscribeFromMarket', { baseId }, { root: true });
    store.dispatch('operations/unsubscribeFromUserOperations', null, { root: true });
    store.dispatch('account/clearCurrentUserData', null, { root: true });
    store.dispatch('operations/resetState', null, { root: true });
  },

  unsubFromUserData(store) {
    const { rootGetters } = store;
    const balances = { ...rootGetters['account/getCurrentUserBalances'] };
    store.dispatch('operations/unsubscribeFromUserOperations', null, { root: true });
    if (!balances) return;
    const baseId = rootGetters['market2/getSystemBaseId'];
    store.dispatch('market2/unsubscribeFromMarket', { baseId }, { root: true });
  }
};

const getters = {
  getModalName: state => state.modalName,
  showHeader: state => state.showHeader
};

const mutations = {
  [APP_SET_MODAL](state, modalName) {
    state.modalName = modalName;
  },
  [APP_INIT]() {
  },
  [SHOW_HEADER](state) {
    state.showHeader = true;
  },
  [HIDE_HEADER](state) {
    state.showHeader = false;
  }
};


const state = {
  modalName: '',
  showHeader: true
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
