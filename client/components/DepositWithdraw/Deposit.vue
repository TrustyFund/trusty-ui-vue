<template lang="pug">
#trusty_transfer

	._turnover_inputs

		trusty-input(
			label="send any sum",
			v-model="amount",
			inputType="tel"
			composed=true,
			v-bind:class='{ "hideborder": !canEnterAmount}',
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
import bitshares from './Bitshares/Deposit';
import './style.scss';

const methodsByGate = {
  trusty: ['Sberbank', 'Tinkoff'],
  openledger: ['Openledger'],
  bitshares: ['BitShares transfer']
};

const nonFiatCoins = ['BTC', 'ETH', 'LTC', 'NEO'];
const internalCoins = ['BTS'];
const fiatCoins = ['RUB'];

const methodsByCoin = {
  openledger: nonFiatCoins,
  bitshares: [...nonFiatCoins, ...internalCoins],
  trusty: fiatCoins
};

export default {
  components: { trustyInput, iconComponent, openledger, trusty, bitshares },
  computed: {
    canEnterAmount() {
      return (fiatCoins.includes(this.selectedcoin));
    },
    gateway() {
      let selectedGateway = false;
      Object.keys(methodsByGate).forEach((gateway) => {
        if (methodsByGate[gateway].includes(this.paymentmethod)) {
          selectedGateway = gateway;
        }
      });
      return selectedGateway;
    },
    gateways() {
      const availableGates = [];
      Object.keys(methodsByCoin).forEach((gateway) => {
        if (methodsByCoin[gateway].includes(this.selectedcoin)) {
          availableGates.push(gateway);
        }
      });
      return availableGates;
    },
    methods() {
      const availableMethods = [];
      this.gateways.forEach((gateway) => {
        availableMethods.push(...methodsByGate[gateway]);
      });
      [this.paymentmethod] = availableMethods;
      return availableMethods;
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
      paymentmethod: 'Openledger',
      amount: '',
      coins: [...nonFiatCoins, ...internalCoins, ...fiatCoins]
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
