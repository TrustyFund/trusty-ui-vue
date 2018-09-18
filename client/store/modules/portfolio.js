
const TOGGLE_PORTFOLIO_MODE = 'TOGGLE_PORTFOLIO_MODE';
const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
const TOGGLE_ASSET_ID_TO_HIDE = 'TOGGLE_ASSET_ID_TO_HIDE';
const TOGGLE_ASSET_ID_TO_SHOW = 'TOGGLE_ASSET_ID_TO_SHOW';
const RESET_STATE = 'RESET_STATE';

const getDefaultState = () => {
  return {
    priceMode: false,
    editMode: false,
    assetsIdsToHide: [],
    assetsIdsToShow: []
  };
};

const initialState = getDefaultState();

const getters = {
  isPriceMode: state => state.priceMode,
  isEditMode: state => state.editMode,
  returnAssetsIdsToHide: state => state.assetsIdsToHide,
  returnAssetsIdsToShow: state => state.assetsIdsToShow
};

const mutations = {
  [TOGGLE_PORTFOLIO_MODE](state) {
    state.priceMode = !state.priceMode;
  },
  [TOGGLE_EDIT_MODE](state) {
    state.editMode = !state.editMode;
  },
  [TOGGLE_ASSET_ID_TO_HIDE](state, id) {
    if (state.assetsIdsToShow.includes(id)) {
      state.assetsIdsToShow.splice(state.assetsIdsToShow.indexOf(id), 1);
    }
    state.assetsIdsToHide.push(id);
  },
  [TOGGLE_ASSET_ID_TO_SHOW](state, id) {
    if (state.assetsIdsToHide.includes(id)) {
      state.assetsIdsToHide.splice(state.assetsIdsToHide.indexOf(id), 1);
    }
    state.assetsIdsToShow.push(id);
  },
  [RESET_STATE](state) {
    Object.assign(state, getDefaultState());
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
  },
  toggleAssetIdToShow({ commit }, asset) {
    commit(TOGGLE_ASSET_ID_TO_SHOW, asset.id);
  },
  resetState({ commit }) {
    commit(RESET_STATE);
  }
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters
};

