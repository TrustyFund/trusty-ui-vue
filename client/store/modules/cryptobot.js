import CryptobotClient from '@/services/cryptobot.js';

const CRYPTOBOT_GET_ORDER_REQUEST = 'CRYPTOBOT_GET_ORDER_REQUEST';
const CRYPTOBOT_GET_ORDER_COMPLETE = 'CRYPTOBOT_GET_ORDER_COMPLETE';
const CRYPTOBOT_GET_ORDER_ERROR = 'CRYPTOBOT_GET_ORDER_ERROR';

const CRYPTOBOT_CONNECT_REQUEST = 'CRYPTOBOT_CONNECT_REQUEST';
const CRYPTOBOT_CONNECT_COMPLETE = 'CRYPTOBOT_CONNECT_COMPLETE';
const CRYPTOBOT_CONNECT_ERROR = 'CRYPTOBOT_CONNECT_ERROR';

const initialState = {
  pending: false,
  connected: false,
  error: false,
  order: false
};

const mutations = {
  [CRYPTOBOT_CONNECT_REQUEST]: (state) => {
    state.pending = true;
  },
  [CRYPTOBOT_CONNECT_COMPLETE]: (state) => {
    state.pending = false;
    state.connected = true;
  },
  [CRYPTOBOT_CONNECT_ERROR]: (state) => {
    state.pending = false;
    state.connected = false;
  },
  [CRYPTOBOT_GET_ORDER_REQUEST]: (state) => {
    state.pending = true;
  },
  [CRYPTOBOT_GET_ORDER_COMPLETE]: (state, { order }) => {
    console.log('FETCH ORDDERS COMPLETE', order);
    state.pending = false;
    state.order = order;
  },
  [CRYPTOBOT_GET_ORDER_ERROR]: (state, { error }) => {
    state.pending = false;
    state.error = error;
  },
};

const actions = {
  connectToCryptobot({ commit }) {
    commit(CRYPTOBOT_CONNECT_REQUEST);

    CryptobotClient.onopen = (msg) => {
      console.log('OPEN', msg);
      commit(CRYPTOBOT_CONNECT_COMPLETE);
    };

    CryptobotClient.onclose = (msg) => {
      console.log('CLOSE', msg);
      commit(CRYPTOBOT_CONNECT_ERROR);
    };

    CryptobotClient.connect();
  },
  async fetchCurrentOrder(store) {
    const { commit, rootGetters } = store;

    commit(CRYPTOBOT_GET_ORDER_REQUEST);

    const user = rootGetters['account/getCurrentUserName'];

    console.log('current user', user);

    const request = { order_id: 1, address: 'anlopan364test2' };
    const result = await CryptobotClient.request('get', 'order', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_GET_ORDER_ERROR, error);
    }

    commit(CRYPTOBOT_GET_ORDER_COMPLETE, { order: result.data });
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  namespaced: true
};
