
const TOGGLE_PORTFOLIO_MODE = 'TOGGLE_PORTFOLIO_MODE';
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
const TOGGLE_ASSET_ID_TO_HIDE = 'TOGGLE_ASSET_ID_TO_HIDE';

const initialState = {
  priceMode: false,
  editMode: false,
  assetsIdsToHide: []
};


const getters = {
  isPriceMode: state => state.priceMode,
  isEditMode: state => state.editMode,
  returnAssetsIdsToHide: state => state.assetsIdsToHide
};

const mutations = {
  [TOGGLE_PORTFOLIO_MODE](state) {
    state.priceMode = !state.priceMode;
  },
  [TOGGLE_EDIT_MODE](state) {
    state.editMode = !state.editMode;
  },
  [TOGGLE_ASSET_ID_TO_HIDE](state, id) {
    if (state.assetsIdsToHide.includes(id)) {
      state.assetsIdsToHide.splice(state.assetsIdsToHide.indexOf(id), 1);
    } else {
      state.assetsIdsToHide.push(id);
    }
  }
};

const actions = {
  togglePriceMode({ commit }) {
    commit(TOGGLE_PORTFOLIO_MODE);
  },
  toggleEditMode({ commit }) {
    commit(TOGGLE_EDIT_MODE);
  },
  toggleAssetIdToHide({ commit }, asset) {
    commit(TOGGLE_ASSET_ID_TO_HIDE, asset.id);
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};

