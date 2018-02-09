const CHANGE_TRANSFER_ACTION = 'CHANGE_TRANSFER_ACTION';
const CHANGE_TRANSFER_COIN_TYPE = 'CHANGE_TRANSFER_COIN_TYPE';
const CHANGE_TRANSFER_DEPOSIT_ADDRESS = 'CHANGE_TRANSFER_DEPOSIT_ADDRESS';
const CHANGE_TRANSFER_SERVICE = 'CHANGE_TRANSFER_SERVICE';
const CHANGE_TRANSFER_AMOUNT = 'CHANGE_TRANSFER_AMOUNT';

const actions = {
  setDepositAddress({ commit }, val) {
    commit(CHANGE_TRANSFER_DEPOSIT_ADDRESS, val);
  },
  setTransferService({ commit }, val) {
    commit(CHANGE_TRANSFER_SERVICE, val);
  },
  changeCoinType({ commit }, val) {
    commit(CHANGE_TRANSFER_COIN_TYPE, val);
  },
  changeTransferAction({ commit }, val) {
    commit(CHANGE_TRANSFER_ACTION, val);
  },
  changeTransferAmount({ commit }, val) {
    commit(CHANGE_TRANSFER_AMOUNT, val);
  }
};

const getters = {
  transferAmount: state => state.amount,
  transferCoin: state => state.coinType,
  transferService: state => state.service,
  transferDepositAddress: state => state.depositAddress
};

const mutations = {

  [CHANGE_TRANSFER_ACTION](state, val) {
    state.action = val;
  },
  [CHANGE_TRANSFER_COIN_TYPE](state, val) {
    state.coinType = val;
  },
  [CHANGE_TRANSFER_DEPOSIT_ADDRESS](state, val) {
    state.depositAddress = val;
  },
  [CHANGE_TRANSFER_SERVICE](state, val) {
    state.service = val;
  },
  [CHANGE_TRANSFER_AMOUNT](state, val) {
    state.amount = val;
  }
};


const state = {
  amount: 0,
  coinType: 'BTC',
  depositAddress: '',
  service: 'blocktrades',
  action: 'withdraw',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
