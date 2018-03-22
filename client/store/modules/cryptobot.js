import CryptobotClient from '@/services/cryptobot.js';
import PersistentStorage from 'lib/src/services/persistent-storage';

const orderStatus = {
  // Just created order
  NEW: 1,
  // There is no enough funds on bitshares buffer(taking in account locked some)
  UNRELIZABLE: 2,
  // There was no operators who can/want to take order
  REJECTED: 3,
  // Operator took order
  ACCEPTED: 4,
  // Operator dropped order after accepting it but before requisites was sent to client.
  DROPPED: 5,
  // Related lb contact found
  LINKED: 6,
  // Waiting for payment from client
  PAYMENT: 7,
  // Canceled by client
  CANCELED: 8,
  // Client did not fund lb contract in time
  TIMEOUT: 9,
  // Waiting for confirmation from operator or lb
  OONFIRMATION: 10,
  // Transferring bitshares
  TRANSFER: 11,
  // Finished
  FINISHED: 12
};

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

const CRYPTOBOT_ORDER_UPDATE_RECEIVED = 'CRYPTOBOT_ORDER_UPDATE_RECEIVED';

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
  [CRYPTOBOT_ORDER_UPDATE_RECEIVED]: (state, { order }) => {
    state.order = order;
  }
};

const getters = {
  hasCurrentOrder: state => state.order !== false,
  getCurrentOrder: state => state.order,
  isConnected: state => state.connected
};

const actions = {
  connect({ commit, dispatch }) {
    commit(CRYPTOBOT_CONNECT_REQUEST);

    CryptobotClient.onmsg = (order) => {
      commit(CRYPTOBOT_ORDER_UPDATE_RECEIVED, { order });
    };

    CryptobotClient.onopen = () => {
      commit(CRYPTOBOT_CONNECT_COMPLETE);

      // PersistentStorage.remove(CRYPTOBOT_CURRENT_ORDER);
      const textOrderId = PersistentStorage.get(CRYPTOBOT_CURRENT_ORDER);
      if (textOrderId) {
        console.log('TRY LOAD ORDER', textOrderId);
        const orderId = parseInt(textOrderId, 10);

        dispatch('fetchOrder', { orderId });
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
      return;
    }

    console.log('PRE COMMIT', result, request);

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

    const result = await CryptobotClient.request('create', 'order', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_CREATE_ORDER_ERROR, error);
      return;
    }

    console.log('CREATE ORDER RESULT', result);

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

    const result = await CryptobotClient.request('cancel', 'order', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_CANCEL_ORDER_ERROR, error);
      return;
    }

    PersistentStorage.remove(CRYPTOBOT_CURRENT_ORDER);
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

    const result = await CryptobotClient.request('mark_payed', 'order', request);

    if (!result.success) {
      const { error } = result;
      commit(CRYPTOBOT_SET_PAYMENT_ERROR, error);
      return;
    }

    commit(CRYPTOBOT_SET_PAYMENT_COMPLETE);
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true
};
