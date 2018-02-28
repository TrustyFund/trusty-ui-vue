<template lang="pug">
#approve_update_portfolio.main_padding

	.transaction_info
		p._value Send 0.00364 BTS to Trusty
		p._value Send 0.00364 BTS to TRFND
		p._value Send 0.00364 BTS to Email-notifier
		p._value Sell 100 BTS for 500 EOS

	trustyInput(label="ENTER PASSWORD TO CONFIRM")
		template(slot="input")
			input(v-model="password" type="password")

	.trusty_inline_buttons._one_button
		button CONFIRM

</template>

<script>
import trustyInput from '@/components/UI/form/input';

export default {
  components: { trustyInput },
  data() {
    return {
      password: ''
    };
  }
};
</script>

<style lang="scss">
p._value {
	padding-top: 1vw;
}
.trusty_inline_buttons._one_button {
	padding-top: 5vw;
}
</style>
