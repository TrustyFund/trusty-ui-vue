<template lang="pug">

.trusty_deposit_fiat_fullscreen Trusty deposit


	.trusty_deposit_fiat

		span(v-if="!connected").loading Loading...

		template(v-else)

			order-fields(v-if="!order")

			template(v-else)

				timer(v-if="checkState('order-new')")

				payment(v-if="checkState('order-new')", :order="order")

				div(v-if="checkState('order-droped')")
					| order dropped by operator
					.trusty_inline_buttons._one_button
						button try again

				div(v-if="checkState('order-rejected')")
					| no operators available
					.trusty_inline_buttons._one_button
						button try again

				div.trusty_deposit_fiat_fullscreen(v-if="checkState('order-new')")
					.trusty_inline_buttons._one_button
						button try again

				span(v-if="checkState('order-accepted')") operator just tooked order

				span(v-if="checkState('order-canceled')") you canceled the order

				span(v-if="checkState('order-timeout')") you faild to pay in time

				span(v-if="checkState('order-confirmation')") We are w8ing for bitcoins to come on lb

				span(v-if="checkState('order-transfer')") It seemd to be ready 1

				span(v-if="checkState('order-finished')") It seemd to be ready 2

			.trusty_inline_buttons
					button(@click="test") TEST

  div.debug
    div(v-if="hasorder")
      | Id -> {{ currentorder.ID }}
      br
      | Status -> {{ currentorder.Status }}
    .trusty_inline_buttons
      button(@click="newOrder", v-if="!hasorder") CREATE ORDER
    .trusty_inline_buttons
      button(@click="cancelOrder", v-if="hasorder") CANCEL ORDER
    .trusty_inline_buttons
      button(@click="connect", v-if="!connected") CONNECT

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import payment from './Payment';
import orderFields from './OrderFields';
import timer from './Timer';

import './style.scss';

export default {
  components: {
    timer,
    payment,
    orderFields,
  },
  data() {
    return {
      connected: true,
      order: true
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
      currentorder: 'cryptobot/getCurrentOrder',
      connected: 'cryptobot/isConnected'
    })
  },
  methods: {
    checkState(showState) {
    	const query = this.$route.query;
    	const { type, state } = query || { type: 'type', state: 'loading' };
      return state === showState;
    },
    ...mapActions({
      connect: 'cryptobot/connect',
      disconnect: 'cryptobot/disconnect',
      getorder: 'cryptobot/fetchOrder',
      createOrder: 'cryptobot/createOrder',
      cancelOrder: 'cryptobot/cancelOrder'
    }),
    newOrder() {
      this.createOrder({
        currency: 'RUB',
        amount: '10000',
        method: 'SBERBANK',
        name: 'Anton Lopan'
      });
    }
  }
};
</script>

<style>

.debug {
  background-color: grey;
  width: 100%;
  height: 100%;
  color: white;
  padding: 5vw;
}
</style>

