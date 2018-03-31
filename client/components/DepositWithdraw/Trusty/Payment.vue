<template lang="pug">

.trusty_deposit_fiat_fullscreen

	.deposit_paddings

		trusty-input(:isOpen="true" label="please use your online bank to send")
			template(slot="input"): div._simple_text_left {{ order.FiatAmount  + ' ' + order.Currency }}

		trusty-input(:isOpen="true" label="to")
			template(slot="input"): div._simple_text_left {{ order.PaymentMethod }}

		trusty-input(:isOpen="true" label="number")
			template(slot="input"): div._simple_text_left {{ requisites }}

		.trusty_inline_buttons._one_button
			button copy address

		trusty-input(:isOpen="true" label="exchanged rate confirmed")
			template(slot="input"): div._simple_text_left {{ amount.rate }}
			template(slot="right"): div._right_slash RUB / BTC

		p._deposit_help_text you will receive {{ amount.final }} BTC

		p.trusty_help_text._bottom._yellow Push CONFIRM button as soon as#[br] you have completed the payment

		.trusty_inline_buttons
			button(@click="$store.dispatch('app/setModal', 'payment')") Confirm
			button(@click="cancelOrder") Cancel

		p.trusty_help_text Payment gateway service is provided by users of Localbitcoins.com


	.modal_wrap(v-if="getModalName === 'payment'")
		.modal_content.main_padding
			p.trusty_help_text Before you continue,#[br] make sure the#[br] payment is done
			.trusty_inline_buttons
				button(@click="markPayed") Done
				button(@click="$store.dispatch('app/setModal', null)") Back

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { trustyInput },
  name: 'Payment',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      order: 'cryptobot/getCurrentOrder',
      getModalName: 'app/getModalName'
    }),
    amount() {
      const {
        FiatAmount,
        LBAmount,
        LBFee,
        OperatorFee,
        BotFee
      } = this.order;
      const final = (LBAmount - LBFee - OperatorFee - BotFee).toFixed(8);
      const rate = Math.floor(FiatAmount / final).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return { final, rate };
    },
    requisites() {
      // Remove spaces
      const withoutSpaces = this.order.PaymentRequisites.replace(/ /g, '');
      // Add spaces ¯\_(ツ)_/¯
      return withoutSpaces.replace(/(.{4})/g, '$1 ');
    }
  },
  methods: {
    ...mapActions({
      cancelOrder: 'cryptobot/cancelOrder',
      payOrder: 'cryptobot/setPayedStatus'
    }),
    markPayed() {
      this.$store.dispatch('app/setModal', null);
      this.payOrder();
    }
  }
};
</script>

<style lang="scss">
.trusty_deposit_fiat_fullscreen {
	.modal_content {
		padding-top: 10vw;
		padding-bottom: 10vw;
		background: black;
	}
}


</style>
