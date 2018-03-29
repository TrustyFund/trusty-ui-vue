<template lang="pug">
#trusty_transfer
	._turnover_inputs

		trusty-input(
			label="send any sum",
			v-model="amount",
			inputType="tel"
			composed=true,
			:close="false")
			template(slot="right")
				icon-component(name="trusty_arrow_down")
				span.fake_option_width
				select(v-model="selectedcoin")
					option(v-for="coin in coins") {{ coin }}

		trusty-input(
			:isOpen="true",
			label="payment method",
			className="select_input payment-method",
			:close="false",
			:foreignInput="true")

			template(slot="input")
				select(v-model="paymentmethod" )
					option(v-for="method in methods", :value="method") {{ method }}

	._turnover_service
		component(:is="gateway", :payload="payload")



</template>

<script>
import trustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import openledger from './Openledger/Deposit';
import trusty from './Trusty/Deposit';
import './style.scss';

const methodsByGate = {
  trusty: ['SBERBANK', 'TINKOFF'],
  openledger: ['OpenLedger']
};

export default {
  components: { trustyInput, iconComponent, openledger, trusty },
  computed: {
    gateway() {
      if (this.selectedcoin === 'RUB') {
        return 'trusty';
      }
      return 'openledger';
    },
    methods() {
      return methodsByGate[this.gateway];
    },
    payload() {
      return {
        coin: this.selectedcoin,
        method: this.paymentmethod,
        amount: this.amount
      };
    }
  },

  data() {
    return {
      selectedcoin: 'BTC',
      paymentmethod: 'OpenLedger',
      amount: '',
      coins: ['BTC', 'ETH', 'LTC', 'NEO', 'RUB']
    };
  }
};
</script>

<style lang="scss">
.payment-method ._input_space {
	padding-bottom: 0.5vh;
}
.deposit_amount {
	width: 80vw!important;
}

</style>
