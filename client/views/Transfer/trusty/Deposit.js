/*eslint-disable*///wip
import Icon from '@/components/icon';
import TrustyInput from '@/components/form/input';
import SoSo from './soso';
import * as states from './states';
import Timer from './timer';
import './styles.scss';

const object = {
  BotFee: '0',
  ClientName: 'stas',
  Currency: 'RUB',
  Destination: 'trustytest2',
  FiatAmount: '500',
  ID: 86,
  LBAmount: '0.0005328511187012',
  LBContractID: 0,
  LBFee: '0',
  OperatorFee: '0',
  OperatorID: 0,
  PaymentMethod: 'SBERBANK',
  PaymentRequisites: '',
  Status: 1
};

export default {

  // props: {
  //   currency: {
  //     type: String,
  //     default: 'RUB'
  //   },
  //   method: {
  //     type: String,
  //     default: '',
  //   },

  //   amout: {
  //     type: Number,
  //     default: 0,
  //   },
  //   name: {
  //     type: String,
  //     default: ''
  //   },
  // },

  data(){
    return {
      connected: false,
    }
  },

  watch: {
    order(val) {
      // Order state update
      if (val && this.order) {
        if (val.Status !== this.order.Status) {
          console.log('Change order status from ', this.order.Status, ' to ', val.Status);
        }
      }

      // New order or loaded one
      if (val && !this.order) {
        console.log('SET ORDER', nextState.order);
      }
    }
  },

  mounted() {
    this.initSoso();
  },

  methods: {

    initSoso() {
      const server = 'https://trusty.fund/channel/';
      const soso = new SoSo(server);
      soso.onmsg = this.receiveMessage;
      soso.onopen = this.socketConnected;
      soso.onclose = this.socketDisconnected;
      this.soso = soso;
    },

    receiveMessage(data) {
      if (data.action_str === 'GET') {
        const order = data.response_map;
        if (order && order.ID) {
          this.order = order;

          if (this.inFinalStatus(order.Status)) {
            this.clearOrder();
          }
        }
      }

      if (data.action_str === 'EVENT') {
        const new_order = data.response_map.order;
        if (new_order) {
          if (this.order) {
            if (this.order.ID === new_order.ID && this.order.Status !== new_order.Status) {
              // We scip accepted status becouse of same screen with timer
              if (new_order.Status !== states.ORDER_ACCEPTED && new_order.Status !== states.ORDER_LINKED) {
                this.order = new_order;
              }

              if (this.inFinalStatus(new_order.Status)) {
                this.clearOrder();
                browserHistory.push('/home');
              }

              if (new_order.Status === states.ORDER_FINISHED) {
                const all = JSON.parse(localStorage.getItem('trusty_pending_deposit')) || [];
                if (all.length) {
                  const one = all.findIndex(i => i.ID === new_order.ID);
                  all.splice(one, 1);
                }
                localStorage.setItem('trusty_pending_deposit', JSON.stringify(all));
              }
            }
          } else {
            this.order = new_order;
            this.setCurrentOrderId(new_order.ID);
          }
        }
      }
    },

    setCurrentOrderId(id) {
      localStorage.setItem('_trusty_current_deposit_id', id);
    },

    getCurrentOrderId() {
      return localStorage.getItem('_trusty_current_deposit_id');
    },

    clearCurrentOrderId() {
      localStorage.removeItem('_trusty_current_deposit_id');
    },

    socketConnected() {
      this.connected = true;

      const current_order_id = this.getCurrentOrderId();

      if (current_order_id) {
        this.getOrder(current_order_id);
      }
    },

    socketDisconnected() {
      this.connected = true;
      this.soso = null;
      this.initSoso();
    },

    onInputChange(type, e) {
      const value = e.target.value;
      const new_state = {};
      new_state[type] = value;
      this.setState(new_state);
    },

    getOrder(order_id) {
      console.log('GET ORDER', order_id);
      const address = localStorage.getItem('_trusty_username');
      this.soso.request('get', 'order', { order_id: parseInt(order_id), address });
    },

    createOrder() {
      const address = localStorage.getItem('_trusty_username');
      const client_name = this.name;
      const payment_method = this.method;
      const currency = this.props.currency;
      const fiat_amount = parseInt(this.props.amount);
      this.soso.request('create', 'order', {
        client_name, address, payment_method, currency, fiat_amount
      });
    },

    clearOrder() {
      this.clearCurrentOrderId();
      this.order = null;
    },

    cancelOrder() {
      const current_order_id = this.getCurrentOrderId();
      console.log('CURRENT ORDER ID', current_order_id);
      const address = localStorage.getItem('_trusty_username');
      this.soso.request('cancel', 'order', { order_id: parseInt(current_order_id), address }).then(() => {
        this.clearOrder();
      });
    },


    cancelOrder(id) {
      const address = localStorage.getItem('_trusty_username');
      this.soso.request('cancel', 'order', { order_id: id, address });
    },

    confirmStatus() {
      ZfApi.publish('trusty_modal_deposit', 'open');
    },

    closeModal() {
      ZfApi.publish('trusty_modal_deposit', 'close');
    },

    setPayedStatus() {
      const current_order_id = this.getCurrentOrderId();
      const address = localStorage.getItem('_trusty_username');
      const pendingDeposits = JSON.parse(localStorage.getItem('trusty_pending_deposit')) || [];
      const order = this.order;
      order.created_at = Date.now();
      const orders = JSON.stringify([...pendingDeposits, order]);
      localStorage.setItem('trusty_pending_deposit', orders);
      this.soso
        .request('mark_payed', 'order', { order_id: parseInt(current_order_id), address });
    },

    inFinalStatus(Status) {
      return (Status === states.ORDER_CONFIRMATION ||
              Status === states.ORDER_TRANSFER ||
              Status === states.ORDER_FINISHED);
    },

    _navigateBackAction() {
      browserHistory.push('/home');
    },

    _onCopyAdress(a) {
      alert('address copied', this._getRequisitesText());
    },

    _getRequisitesText() {
      return this.order.PaymentRequisites;
    },

    drawPaymentState() {
      const header = (
          <div class="trusty_header">
              <span class="_back" onClick={this._navigateBackAction}>
                <Icon name="trusty_arrow_back"/>
              </span>
              <span class="header_title">DEPOSIT PAYMENT</span>
          </div>
      );

      const fiat_amount = parseInt(this.order.FiatAmount);
      const lb_amount = parseFloat(this.order.LBAmount);
      const lb_fee = parseFloat(this.order.LBFee);
      const op_fee = parseFloat(this.order.OperatorFee);
      const bot_fee = parseFloat(this.order.BotFee);
      const final_amount = (lb_amount - lb_fee - op_fee - bot_fee).toFixed(8);
      const exchange_rate = Math.floor(fiat_amount / final_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      const body = (
          <div class="deposit_paddings">

            <TrustyInput isOpen={true} label="please use your online bank to send" input={<div class="_simple_text_left">{this.order.FiatAmount + ' ' + this.order.Currency}</div>} />
            <TrustyInput isOpen={true} label="to" input={<div class="_simple_text_left">{this.order.PaymentMethod}</div>} />
            <TrustyInput isOpen={true} label="number" input={<div class="_simple_text_left">{this.order.PaymentRequisites}</div>} />

            <div class="trusty_inline_buttons _one_button">
              <button>copy address</button>
            </div>

            <TrustyInput isOpen={true} label="exchange rate confirmed" input={<div class="_simple_text_left">{exchange_rate}</div>} right={<div class="_right_slash">RUB / BTC</div>} />
            <p class="_deposit_help_text">you will receive {final_amount} BTC</p>

            <p class="trusty_help_text _bottom _yellow">Push CONFIRM button as soon as<br/> you have completed the payment</p>

            <div class="trusty_inline_buttons">
                <a onClick={this.confirmStatus} class="b_left"><button>Confirm</button></a>
                <a onClick={this.cancelOrder} class="b_right"><button >Cancel</button></a>
            </div>

            <p class="trusty_ps_text">Payment gateway service is provided by users of <br/> Localbitcoins.com</p>

          </div>
      );

      return (
        <div class="trusty_deposit_fiat_fullscreen">
          {header}
          {body}
          <BaseModal id={'trusty_modal_deposit'}>
            <div class="_inner">
              <p>Before you continue,<br /> make sure the<br /> payment is done</p>
              <div class="trusty_inline_buttons">
                  <a onClick={this.setPayedStatus} class="b_left"><button>Done</button></a>
                  <a onClick={this.closeModal}class="b_right"><button >Back</button></a>
              </div>
            </div>
          </BaseModal>
        </div>
      );
    },

    drawTimerState() {
      const cancel_button = (
        <button type="button" class="trusty_wide_btn" onClick={this.cancelOrder}>
          CANCEL ORDER
        </button>
      );

      return (
        <div class="trusty_deposit_fiat_fullscreen deposit_paddings">
          <Timer text="YOU WILL GET DEPOSIT DETAILS IN <br /> UNDER 3 MINUTES"/>
          {cancel_button}
        </div>
      );
    },

    drawNewOrderFields() {
      const fakeWidth = <span style={{ display: 'none', fontFamily: 'Gotham_Pro_Bold', fontSize: '6.6vw' }} id="width_tmp_option"/>;

      const deposit_input_amount_edit_box = (
          <input
            value={this.amount}
            style={{ width: '11rem' }}
            type="text"
            placeholder="SEND ANY SUM"
            onChange={this.onInputChange('amount')}
          />
      );

      const deposit_input_coin_type_select = (
          <div>
            <select id="resizing_select" value={this.currency} onChange={this.onInputChange('currency')}>
              <option value="RUB">RUB</option>
              <option value="USD">USD</option>
            </select>
            {fakeWidth}
            <Icon name="trusty_arrow_down"/>
          </div>
      );

      const payment_methods = (
            <select value={this.method} onChange={this.onInputChange('method')}>
              <option value="SBERBANK">SBERBANK</option>
              <option value="ALIPAY">ALIPAY</option>
              <option value="TINKOFF">TINKOFF</option>
            </select>
      );

      const name_input = (
            <input type="text" value={this.name} onChange={this.onInputChange('name')} />
      );

      return (
          <div class="trusty_deposit_fiat" style={{ paddingTop: '10px 2rem 0 2rem' }}>
            <div class="_margin_bottom">
              <TrustyInput
                input={payment_methods}
                right={<div class="only_right_arrow"><Icon name="trusty_arrow_down"/></div>}
                isOpen={true}
                label={'payment method'}
                type="select"
              />
              <TrustyInput
                input={name_input}
                label="NAME AND SURNAME OF PAYER"
              />
            </div>
            <div class="trusty_inline_buttons _one_button">
              <button style={{ marginBottom: 0 }} type="button" class="trusty_wide_btn" onClick={this.createOrder}>
                CONFIRM
              </button>
            </div>
            <p class="trusty_ps_text">Payment gateway service is provided by users of <br/> Localbitcoins.com</p>
          </div>
      );
    }

  },

  render() {
    const try_again_button = (
      <button type="button" class="trusty_wide_btn" onClick={this.clearOrder}>
        TRY AGAIN
      </button>
    );

    if (!this.connected) {
      return (<span>Loading...</span>);
    }

    if (this.order) {
      switch (this.order.Status) {
        case states.ORDER_NEW:
          return this.drawTimerState();
          break;

        case states.ORDER_DROPPED:
          return (<div>order dropped by operator{try_again_button}</div>);
          break;

        case states.ORDER_REJECTED:
          return (<span>No operators availble{try_again_button}</span>);
          break;

        case states.ORDER_ACCEPTED:
          return (<span>Operator just tooked order</span>);
          break;

        case states.ORDER_PAYMENT:
          return this.drawPaymentState();
          break;

        case states.ORDER_CANCELED:
          return (<span onClick={this.clearOrder}>You canceled the order</span>);
          break;

        case states.ORDER_TIMEOUT:
          return (<span>You failed to pay in time</span>);
          break;

        case states.ORDER_CONFIRMATION:
          return (<span>We are w8ing for bitcoins to come on lb</span>);
          break;

        case states.ORDER_TRANSFER:
          return (<span>It seemd to be ready 1</span>);
          break;

        case states.ORDER_FINISHED:
          return (<span>It seemd to be ready 2</span>);
          break;
      }
    } else {
      return this.drawNewOrderFields();
    }
  }
};

/*eslint-disable*///wip

