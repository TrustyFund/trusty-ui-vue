<template lang="pug">
#approve_update_portfolio.main_padding

	.transaction_info
		._date 20 feb 18 16:56
		p._value Receive 0.00364 BTS

	trustyInput(label="value")
		template(slot="input")
			input(type="number")

	.trusty_inline_buttons._one_button
		button approve

</template>

<script>
import trustyInput from '@/components/UI/form/input';

export default {
  components: { trustyInput },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss">
</style>
