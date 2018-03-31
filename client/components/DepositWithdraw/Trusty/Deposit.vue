<template lang="pug">
._turnover_info
  .status(v-if="!connected")
    span(v-if="pending").loading Loading...
    span(v-if="error").loading Service unavailable
  template(v-else)
    .trusty_deposit_fiat(v-if="!hasorder")
      ._margin_bottom
        trusty-input(:isOpen="false", label="NAME AND SURNAME OF PAYER")
          template(slot="input"): input(type="text" v-model="clientName")
          
      .trusty_inline_buttons._one_button
        button(@click="newOrder") CONFIRM
      p.trusty_ps_text
        | Payment gateway service is provided by users of #[br] Localbitcoins.com

    .trusty_deposit_fiat_fullscreen(v-else)
      .trusty_deposit_fiat
        timer(v-if="order.isWaitingOperatorAction()")
        timer(v-if="order.isRejected()" error)

        payment(v-if="order.hasRequisites()")

        div(v-if="order.isComplete()")
          span._tooltip Transaction complete, you will receive BTC soon
          .trusty_inline_buttons._one_button
            button(@click="clearOrder") Got it
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import trustyInput from '@/components/UI/form/input';
import icon from '@/components/UI/icon';
import payment from './Payment';
import timer from './Timer';

import './style.scss';

export default {
  components: {
    timer,
    payment,
    trustyInput,
    icon
  },
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clientName: ''
    };
  },
  beforeMount() {
    this.connect();
  },
  beforeDestroy() {
    this.disconnect();
  },
  computed: {
    ...mapGetters({
      hasorder: 'cryptobot/hasCurrentOrder',
      order: 'cryptobot/getCurrentOrder',
      connected: 'cryptobot/isConnected',
      pending: 'cryptobot/getPendingStatus',
      error: 'cryptobot/getError'
    })
  },
  methods: {
    ...mapActions({
      connect: 'cryptobot/connect',
      disconnect: 'cryptobot/disconnect',
      getorder: 'cryptobot/fetchOrder',
      createOrder: 'cryptobot/createOrder',
      cancelOrder: 'cryptobot/cancelOrder',
      clearOrder: 'cryptobot/clearOrder'
    }),
    finishDeposit() {
      this.clearOrder();
      this.$router.push({ name: 'entry' });
    },
    checkState(showState) {
      const { query } = this.$route;
      const { state } = query || { state: 'loading' };
      return state === showState;
    },
    newOrder() {
      this.createOrder({
        currency: this.payload.coin,
        amount: this.payload.amount,
        method: this.payload.method,
        name: this.clientName
      });
    }
  },
  watch: {
    order(newOrder) {
      console.log('RECEIVE UPDATE', newOrder);
    }
  }
};
</script>

<style lang="scss">

.trusty_deposit_fiat {

  ._tooltip, .loading {
    display: block;
    position:relaive;
    font-family: Gotham_Pro;
    font-size: 4vw;
  }
}

.status {
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

.debug_but {
  position: absolute;
  bottom: 0;
  right: 3.6vw;
  left: 0;
  width: 100%;

}
.debug {
  background-color: grey;
  width: 100%;
  height: 100%;
  color: white;
  padding: 5vw;
}
</style>
