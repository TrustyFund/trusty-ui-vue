<template lang="pug">
._turnover_info
	.trusty_help_text._yellow
		| Send {{ payload.coin }} to the address below
	.trusty_cutted_address(v-html="depositAddress")
	.trusty_inline_buttons._one_button(
		v-clipboard:copy="this.address"
		v-clipboard:success="onCopy"
	): button Copy address
	._yellow.trusty_ps_text(v-show="getCoinData")
		| IMPORTANT: Send not less than {{ getCoinData }} {{ payload.coin }} to this deposit address.
		| Sending less than {{ getCoinData }} {{ payload.coin }} or any other currency will result
		| in the loss of your deposit.
	.trusty_help_text._yellow
		| Push CONFIRM button as soon as you have completed the payment
	.trusty_inline_buttons
		button(@click="$router.replace('/')") Confirm
		button(@click="$router.replace('/')") Cancel
	p.trusty_ps_text
		| Payment gateway service is provided by #[br]
		| Openledger.io at 0% fee

</template>

<script>
import trustyInput from '@/components/UI/form/input';
import { mapGetters, mapActions } from 'vuex';
import iconComponent from '@/components/UI/icon';

export default {
  props: ['payload', 'fee'],
  data() {
    return {};
  },
  beforeMount() {
    this.fetchCoins();
    this.fetchAddress({ asset: this.payload.coin });
  },
  computed: {
    depositAddress() {
      if (this.address) {
        const firstCount = Math.floor(this.address.length / 2) - 1;
        const start = this.address.slice(0, firstCount);
        const end = this.address.slice(firstCount);
        return `<span>${start}</span><br/><span>${end}</span>`;
      }
      return '<span>No address</span>';
    },
    getCoinData() {
      const coin = this.payload.coin.toLowerCase();
      const coins = this.coinsData;
      if (coins[coin] !== undefined) {
        const { gateFee } = coins[coin];
        if (gateFee > 0) {
          return gateFee * 2;
        }
        return false;
      }
      return false;
    },
    ...mapGetters({
      address: 'openledger/getDepositAddress',
      coinsData: 'openledger/getCoinsData'
    })
  },
  methods: {
    ...mapActions({
      fetchAddress: 'openledger/fetchDepositAddress',
      fetchCoins: 'openledger/fetchCoins'
    }),
    onCopy() {
      // eslint-disable-next-line
      alert('Address copied');
    }
  },
  watch: {
    payload(payload) {
      this.fetchAddress({ asset: payload.coin });
    }
  },
  components: {
    trustyInput,
    iconComponent
  }
};
</script>

<style scoped>
.trusty_help_text {
	padding-top: 4vh;
}
._input_space input {
	width: 75%!important;
}

.deposit_text {
	font-size: 3vw;
	padding-bottom: 3vw;
}

.trusty_inline_buttons {
	padding-top: 1vh!important;
	overflow: none!important;
	line-height: 13.2vw!important;
}
</style>
