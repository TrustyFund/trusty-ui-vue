<template lang="pug">
#trusty_transfer
	._turnover_inputs

		TrustyInput(label="Enter sum"
								 composed=true
								 :class="{'hideborder': !canEnterAmount}")
			template(slot="input" v-if="canEnterAmount")
				input(v-model="amount" @input="$v.amount.$touch()")
			template(slot="input" v-else)
				span(
					class="no_opened"
				).trusty_place_holder Choose currency
			template(slot="right")
				select(v-model="selectedcoin"  dir="rtl")
					option(v-for="coin in coins") {{ coin }}
				Icon(name="trusty_arrow_down")
		.trusty_font_error(v-if="!$v.amount.required && this.$v.amount.$dirty") Enter amount
		.trusty_font_error(v-if="$v.amount.required && !$v.amount.isNumeric && this.$v.amount.$dirty") Enter a number

		TrustyInput(:isOpen="true",
								label="payment method"
								className="select_input payment-method" )
			template(slot="input")
				input(:style="{display:'none'}")
				select(v-model="paymentmethod" )
					option(v-for="method in methods", :value="method") {{ method }}
				Icon(name="trusty_arrow_down" style="position: absolute")

	._turnover_service
		component(:is="gateway", :payload="payload")



</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import TrustyInput from '@/components/UI/form/input';
import Icon from '@/components/UI/icon';
import openledger from './Openledger/Deposit';
import trusty from './Trusty/Deposit';
import bitshares from './Bitshares/Deposit';
import './style.scss';

const methodsByGate = {
  trusty: [
    'Tinkoff card2card transfer',
    'Sberbank card2card transfer',
    'VTB card2card transfer',
    'Alfa bank card2card transfer',
    'All banks card2card transfer'
  ],
  openledger: ['OpenLedger crypto gateway'],
  bitshares: ['BitShares direct transfer']
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
  mixins: [validationMixin],
  components: { TrustyInput, Icon, openledger, trusty, bitshares },
  data() {
    return {
      selectedcoin: 'BTC',
      paymentmethod: 'Openledger',
      amount: '',
      coins: [...nonFiatCoins, ...internalCoins, ...fiatCoins]
    };
  },
  validations: {
    amount: {
      required,
      isNumeric(value) {
        const parsed = +value;
        return parsed && !Number.isNaN(parsed);
      }
    }
  },
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
        amount: this.$v.$invalid ? 0 : this.amount
      };
    }
  }
};
</script>

<style lang="scss">
#trusty_transfer {
	height: 100vh;
}
._input_space.composed {
	width: 68vw!important;
}
</style>
