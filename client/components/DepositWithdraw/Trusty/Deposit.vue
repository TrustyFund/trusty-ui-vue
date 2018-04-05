<template lang="pug">
._turnover_info

  .status(v-if="!connected")
    .spinner_container(v-show="pending")
      Spinner
    span(v-if="error").loading Service unavailable
  template(v-else)
    .trusty_deposit_fiat(v-if="!hasorder")
      ._margin_bottom

        TrustyInput(
        	:isOpen="clientName !== ''",
        	label="NAME AND SURNAME OF PAYER",
        	v-model="clientName",
        	:validate="$v.clientName.$touch")

        .trusty_font_error(v-if="!$v.clientName.required && this.$v.clientName.$dirty") Enter cardholder's name

      .trusty_inline_buttons._one_button(:class="{'_disabled': !payload.amount}")
        button(@click="newOrder") CONFIRM
      p.trusty_ps_text
        | Payment gateway service is provided by users of #[br] Localbitcoins.com

    .trusty_deposit_fiat(v-else)
      timer(v-if="order.isWaitingOperatorAction()")
      timer(v-if="order.isRejected()" error)

      payment(v-if="order.hasRequisites()")

</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import TrustyInput from '@/components/UI/form/input';
import Spinner from '@/components/UI/Spinner';
// eslint-disable-next-line
import * as types from 'lib/src/mutations';
import Payment from './Payment';
import Timer from './Timer';

import './style.scss';

export default {
  mixins: [validationMixin],
  components: {
    Timer,
    Payment,
    TrustyInput,
    Spinner
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
  validations: {
    clientName: {
      required
    }
  },
  mounted() {
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
      this.$v.$touch();
      if (!this.$v.$invalid && this.payload.amount) {
        this.createOrder({
          currency: this.payload.coin,
          amount: this.payload.amount,
          method: this.payload.method,
          name: this.clientName
        });
      }
    },
    getTotalAmount(order) {
      const {
        LBAmount,
        LBFee,
        OperatorFee,
        BotFee
      } = order;
      return (LBAmount - LBFee - OperatorFee - BotFee).toFixed(8);
    }
  },
  watch: {
    order(newOrder) {
      if (newOrder.Status === 10) {
        this.clearOrder();

        const operation = {
          date: new Date(),
          type: 'pending_deposit',
          amount: this.getTotalAmount(newOrder)
        };

        this.$store.commit('operations/' + types.ADD_USER_OPERATION, {
          operation
        });

        this.$toast.success('Deposit request complete');
        this.$router.push({ name: 'entry' });
      }
      if (newOrder.Status === 9) {
        this.clearOrder();
        this.$toast.warning('TRANSACTION CANCELED');
        this.$router.push({ name: 'entry' });
      }

      if (newOrder.Status === 8) {
        this.clearOrder();
      }
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
