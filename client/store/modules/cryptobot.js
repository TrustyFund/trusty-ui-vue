import CryptobotClient from '@/services/cryptobot.js';
import PersistentStorage from 'lib/src/services/persistent-storage';


const CRYPTOBOT_CONNECT_REQUEST = 'CRYPTOBOT_CONNECT_REQUEST';
const CRYPTOBOT_CONNECT_COMPLETE = 'CRYPTOBOT_CONNECT_COMPLETE';
const CRYPTOBOT_CONNECT_CLOSE = 'CRYPTOBOT_CONNECT_CLOSE';

const CRYPTOBOT_GET_ORDER_REQUEST = 'CRYPTOBOT_GET_ORDER_REQUEST';
const CRYPTOBOT_GET_ORDER_COMPLETE = 'CRYPTOBOT_GET_ORDER_COMPLETE';
const CRYPTOBOT_GET_ORDER_ERROR = 'CRYPTOBOT_GET_ORDER_ERROR';

const CRYPTOBOT_CREATE_ORDER_REQUEST = 'CRYPTOBOT_CREATE_ORDER_REQUEST';
const CRYPTOBOT_CREATE_ORDER_COMPLETE = 'CRYPTOBOT_CREATE_ORDER_COMPLETE';
const CRYPTOBOT_CREATE_ORDER_ERROR = 'CRYPTOBOT_CREATE_ORDER_ERROR';

const CRYPTOBOT_CURRENT_ORDER = 'CRYPTOBOT_CURRENT_ORDER';

const CRYPTOBOT_CANCEL_ORDER_REQUEST = 'CRYPTOBOT_CANCEL_ORDER_REQUEST';
const CRYPTOBOT_CANCEL_ORDER_COMPLETE = 'CRYPTOBOT_CANCEL_ORDER_COMPLETE';
const CRYPTOBOT_CANCEL_ORDER_ERROR = 'CRYPTOBOT_CANCEL_ORDER_ERROR';

const CRYPTOBOT_SET_PAYMENT_REQUEST = 'CRYPTOBOT_SET_PAYMENT_REQUEST';
const CRYPTOBOT_SET_PAYMENT_COMPLETE = 'CRYPTOBOT_SET_PAYMENT_COMPLETE';
const CRYPTOBOT_SET_PAYMENT_ERROR = 'CRYPTOBOT_SET_PAYMENT_ERROR';

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
  [CRYPTOBOT_CONNECT_CLOSE]: (state) => {
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
  [CRYPTOBOT_CREATE_ORDER_REQUEST]: (state) => {
    state.pending = true;
  },
  [CRYPTOBOT_CREATE_ORDER_COMPLETE]: (state, { order }) => {
    console.log('FETCH ORDDERS COMPLETE', order);
    state.pending = false;
    state.order = order;
  },
  [CRYPTOBOT_CREATE_ORDER_ERROR]: (state, { error }) => {
    state.pending = false;
    state.error = error;
  },
  [CRYPTOBOT_CANCEL_ORDER_REQUEST]: (state) => {
    state.pending = true;
  },
  [CRYPTOBOT_CANCEL_ORDER_COMPLETE]: (state) => {
    state.pending = false;
    state.order = false;
  },
  [CRYPTOBOT_CANCEL_ORDER_ERROR]: (state, { error }) => {
    state.pending = false;
    state.error = error;
  },
};

const actions = {
  connect({ commit, dispatch }) {
    commit(CRYPTOBOT_CONNECT_REQUEST);

    CryptobotClient.onopen = () => {
      commit(CRYPTOBOT_CONNECT_COMPLETE);

      const orderId = PersistentStorage.get(CRYPTOBOT_CURRENT_ORDER);
      if (orderId) {
        dispatch('fetchOrder', orderId);
      }
    };

    CryptobotClient.onclose = (msg) => {
      console.log('CLOSE', msg);
      commit(CRYPTOBOT_CONNECT_CLOSE);
    };

    CryptobotClient.connect();
  },
  disconnect() {
    CryptobotClient.close();
  },
  async fetchOrder(store, { orderId }) {
    const { commit, rootGetters } = store;
    commit(CRYPTOBOT_GET_ORDER_REQUEST);

    const user = rootGetters['account/getCurrentUserName'];
    const request = { order_id: orderId, address: user };
    const result = await CryptobotClient.request('get', 'order', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_GET_ORDER_ERROR, error);
    }

    commit(CRYPTOBOT_GET_ORDER_COMPLETE, { order: result.data });
  },
  async createOrder({ commit, rootGetters }, { currency, amount, method, name }) {
    commit(CRYPTOBOT_CREATE_ORDER_REQUEST);

    const user = rootGetters['account/getCurrentUserName'];

    const request = {
      client_name: name,
      address: user,
      payment_method: method,
      fiat_amount: amount,
      currency
    };

    const result = await CryptobotClient.request('create', 'oreder', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_CREATE_ORDER_ERROR, error);
    }

    const order = result.data;

    PersistentStorage.set(CRYPTOBOT_CURRENT_ORDER, order.ID);
    commit(CRYPTOBOT_CREATE_ORDER_COMPLETE, { order });
  },
  async cancelOrder(store) {
    const { commit, state, rootGetters } = store;
    commit(CRYPTOBOT_CANCEL_ORDER_REQUEST);

    const user = rootGetters['account/getCurrentUserName'];

    const request = {
      order_id: state.order.ID,
      address: user
    };

    const result = await CryptobotClient.request('cancel', 'oreder', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_CANCEL_ORDER_ERROR, error);
    }

    PersistentStorage.set(CRYPTOBOT_CURRENT_ORDER, false);
    commit(CRYPTOBOT_CANCEL_ORDER_COMPLETE);
  },
  async setPayedStatus(store) {
    const { commit, state, rootGetters } = store;
    commit(CRYPTOBOT_SET_PAYMENT_REQUEST);

    const user = rootGetters['account/getCurrentUserName'];
    const request = {
      order_id: state.order.ID,
      address: user
    };

    const result = await CryptobotClient.request('mark_payed', 'oreder', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_SET_PAYMENT_ERROR, error);
    }

    commit(CRYPTOBOT_SET_PAYMENT_COMPLETE);
  }
};

export default {
  state: initialState,
  actions,
  mutations,
  namespaced: true
};
