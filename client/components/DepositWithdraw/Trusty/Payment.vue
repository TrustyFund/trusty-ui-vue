<template lang="pug">

.trusty_deposit_fiat_fullscreen

	.deposit_paddings

		trusty-input(:isOpen="true" label="please use your online bank to send")
			template(slot="input"): div._simple_text_left {{ order.FiatAmount  + ' ' + order.Currency }}

		trusty-input(:isOpen="true" label="to")
			template(slot="input"): div._simple_text_left {{ order.PaymentMethod }}

		trusty-input(:isOpen="true" label="number")
			template(slot="input"): div._simple_text_left {{ order.PaymentRequisites }}

		.trusty_inline_buttons._one_button
			button copy address

		trusty-input(:isOpen="true" label="exchanged rate confirmed")
			template(slot="input"): div._simple_text_left 1.55
			template(slot="right"): div._right_slash RUB / BTC

		p._deposit_help_text you will receive 100 BTC

		p.trusty_help_text._bottom._yellow Push CONFIRM button as soon as#[br] you have completed the payment

		.trusty_inline_buttons
			button Confirm
			button Cancel

		p.trusty_help_text Payment gateway service is provided by users of Localbitcoins.com


	.modal_wrap
		.modal_content.main_padding
			p.trusty_help_text Before you continue,#[br] make sure the#[br] payment is done
			.trusty_inline_buttons
				button Done
				button Back

</template>

<script>
import trustyInput from '@/components/UI/form/input';

export default {
  components: { trustyInput },
  name: 'Payment',
  props: ['order'],
  data() {
    return {

    };
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
