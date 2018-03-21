<template lang="pug">

.trusty_deposit_fiat

	._margin_bottom

		trusty-input(type="select", :isOpened="true", label="payment method")
			template(slot="input")
				select
					option SBERBANK
					option ALIPLAY
					option TINKOFF

		trusty-input(label="NAME AND SURNAME OF PAYER")
			template(slot="input"): input(type="text")
			tempalte(slot="right")
				.only_right_arrow: icon(name="trusty_arrow_down")

	.trusty_inline_buttons._one_button
		button CONFIRM

	p.trusty_ps_text
		| Payment gateway service is provided by users of #[br] Localbitcoins.com


</template>

<script>
import icon from '@/components/UI/icon';
import trustyInput from '@/components/UI/form/input';

export default {

  components: { icon, trustyInput },

  data() {
    return {

    };
  }
};
</script>

<style lang="scss">
</style>
