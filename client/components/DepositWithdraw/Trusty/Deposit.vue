<template lang="pug">
._turnover_info
	span(v-if="!connected").loading Loading...
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

				timer(v-if="order.isNew()")

				payment(v-if="checkState('order-payment')", :order="order")

				div(v-if="order.isRejected()")
					span._tooltip No operators availble
					.trusty_inline_buttons._one_button
						button(@click="clearOrder") try again

				div.trusty_deposit_fiat_fullscreen(v-if="checkState('order-new')")
					.trusty_inline_buttons._one_button
						button try again

				span._tooltip(v-if="checkState('order-accepted')") operator just tooked order

				span._tooltip(v-if="checkState('order-canceled')") you canceled the order

				span._tooltip(v-if="checkState('order-timeout')") you faild to pay in time

				span._tooltip(v-if="checkState('order-confirmation')") We are w8ing for bitcoins to come on lb

				span._tooltip(v-if="checkState('order-transfer')") It seemd to be ready 1

				span._tooltip(v-if="checkState('order-finished')") It seemd to be ready 2


	.trusty_inline_buttons.debug_but
		button(@click="next") NEXT
		button(@click="connect" v-if="!connected") CONNECT
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
    /* return {
      order: {
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
      }
    }; */
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
      connected: 'cryptobot/isConnected'
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
      console.log('NEW ORDER', this.payload, this.clientName);
    },
    next() {
      const path = [
        'timer',
        'order-payment',
        'order-new',
        'order-droped',
        'order-rejected',
        'order-canceled',
        'order-timeout',
        'order-confirmation',
        'order-transfer',
        'order-finished'
      ];
      const { query: state } = this.$route;

      let index = 0;
      if (state.state) {
        index = path.indexOf(state.state) + 1;
      }
      this.$router.push({ name: 'deposit', query: { state: path[index] } });
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

.loading {
	//position: absolute;
	//top: 50%;
	//left: 50%;

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
