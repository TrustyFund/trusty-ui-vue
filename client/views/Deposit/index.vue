<template lang="pug">

#trusty_deposit

	._turnover_inputs
		
		trusty-input(label="send any sum")
			template(slot="input")
				input
			template(slot="right")
				icon-component(name="trusty_arrow_down")
				span.fake_option_width
				select
					option BTC
					option DASH
	
	._turnover_info

		.trusty_help_text._yellow
			| Push CONFIRM button as soon as you have completed the payment
		p.trusty_ps_text 
			| Payment gateway service is provided by #[br]
			| Openledger.io at 0% fee

</template>

<script>

import trustyInput from '@/components/form/input';
import iconComponent from '@/components/icon';

export default {

  components: { trustyInput, iconComponent },
  data() {
    return {

    };
  }
};

</script>

<style lang="scss">

@import "~@/style/mixins";

#trusty_deposit {
	@include trusty_main_padding;
}


.trusty_help_text {
	font-family: Gotham_Pro;
	text-align: center;
	margin-bottom: 10px;
}


@media screen and (max-width: 768px) {

	._clipboard_value {
		margin-top: 2.3vw;
		overflow: scroll;
		span {
			 display: table-cell;
			 padding-right: 10px;
		}
	}
	.trusty_help_text {
		font-size: 4.8vw;
		line-height: 6vw;
		margin-bottom: 4.1vw;
	}

	.trusty_cutted_address {
		text-align: center;
		font-family: Gotham_Pro_Bold;
		font-size: 6vw;
		line-height: 7vw;
		margin-bottom: 4.1vw;
	}

}


.trusty_deposit_address {
	display: inline-block;
	margin-bottom: get-vw(8px);
}

.trusty_ps_text {

	font-family: Gotham_Pro;
	text-align: center;

	@media screen and (max-width: 768px) {
		font-size: 3.3vw;
		margin: 3.8vw 0;
		line-height: 4.3vw;
	}

}



@media screen and (min-width: 769px) {
	#trusty_deposit {
		width: 80%;
		margin: 0 auto;
	}
}






</style>