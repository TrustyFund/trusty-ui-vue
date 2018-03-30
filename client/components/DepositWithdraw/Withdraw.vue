<template lang="pug">
#trusty_transfer
  ._turnover_inputs
    TrustyInput(label="enter sum" composed=true)
      template(slot="input")
        input(v-model="amount" @input="$v.amount.$touch()")
      template(slot="right")
        select(v-model="selectedCoin" v-if="isNonZeroLength" dir="rtl")
          option(v-for="(coin, id) in nonZeroAssets", v-bind:value="id") {{ coin.symbol }}
        icon-component(name="trusty_arrow_down")

    .trusty_font_error(v-if="!$v.amount.required && this.$v.amount.$dirty") Enter amount
    .trusty_font_error(v-if="$v.amount.required && !$v.amount.isNumeric && this.$v.amount.$dirty") Enter a number
    .trusty_font_error(v-if="$v.amount.isNumeric && !$v.amount.doesntExceedBalance && this.$v.amount.$dirty") Innuficient funds
    .trusty_font_error(
      v-if=`$v.amount.isNumeric && 
      $v.amount.doesntExceedBalance &&
      !$v.amount.doesntExceedMinWithdraw && 
      this.$v.amount.$dirty`) Minimal withdraw amount {{ minWithdraw }}
    TrustyInput(:isOpen="true", label="payment method" className="select_input payment-method")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="paymentMethod" )
          option(v-for="method in methods") {{ method }}

  ._turnover_service
    component(:is="gateway" :amount="payload.amount" :coin="payload.selectedcoin")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import TrustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import openledger from './Openledger/Withdraw';
import bitshares from './Bitshares/Withdraw';
import './style.scss';

const OpenledgerName = 'OpenLedger';
const BitsharesName = 'BitShares transfer';

const methodsByGate = {
  openledger: [OpenledgerName],
  bitshares: [BitsharesName]
};

// BTS amount 0.07
export default {
  data() {
    return {
      selectedCoin: '1.3.0',
      paymentMethod: BitsharesName,
      amount: '',
    };
  },
  components: { TrustyInput, iconComponent, openledger, bitshares },
  mixins: [validationMixin],
  validations: {
    amount: {
      required,
      isNumeric(value) {
        const parsed = +value;
        return parsed && !Number.isNaN(parsed);
      },
      doesntExceedBalance(value) {
        const id = this.selectedCoin;
        const balance = this.balances[id].balance / (10 ** this.getAssetById(id).precision);
        return (value * 1.03) < balance;
      },
      doesntExceedMinWithdraw(value) {
        if (this.paymentMethod === OpenledgerName) {
          return value > this.minWithdraw;
        }
        return true;
      }
    }
  },
  beforeMount() {
    this.fetchCoins();
  },
  methods: {
    ...mapActions({
      fetchCoins: 'openledger/fetchCoins'
    })
  },
  computed: {
    ...mapGetters({
      balances: 'account/getCurrentUserBalances',
      getAssetById: 'assets/getAssetById',
      coinsData: 'openledger/getCoinsData'
    }),
    minWithdraw() {
      if (this.paymentMethod === OpenledgerName) {
        const coin = this.getAssetById(this.selectedCoin);
        const coinName = coin.symbol.toLowerCase();
        const { gateFee } = this.coinsData[coinName];
        return parseFloat(gateFee) * 2;
      }
      return 0;
    },
    isNonZeroLength() {
      return Object.keys(this.nonZeroAssets).length;
    },
    nonZeroAssets() {
      const result = {};
      Object.keys(this.balances).forEach(id => {
        if (this.balances[id].balance) result[id] = this.getAssetById(id);
      });
      return result;
    },
    nonZeroBalanceAssetsIds() {
      return Object.keys(this.balances)
        .filter(id => this.balances[id].balance)
        .map(id => {
          const { symbol } = this.getAssetById(id);
          return { symbol, id };
        });
    },
    transferConfig() {
      return {
        openledger: [],
        transfer: this.nonZeroBalanceAssetsIds
      };
    },
    gateway() {
      let selectedGateway = false;
      Object.keys(methodsByGate).forEach((gateway) => {
        if (methodsByGate[gateway].includes(this.paymentMethod)) {
          selectedGateway = gateway;
        }
      });
      return selectedGateway;
    },
    methods() {
      const availableMethods = [BitsharesName];
      const { issuer } = this.getAssetById(this.selectedCoin);
      if (issuer === '1.2.96397') {
        availableMethods.push(OpenledgerName);
      }
      [this.paymentMethod] = availableMethods;
      return availableMethods;
    },
    currentAssetAmount() {
      if (this.$v.$invalid) return 0;
      return Math.floor(this.amount * (10 ** this.getAssetById(this.selectedCoin).precision));
    },
    payload() {
      return {
        selectedcoin: this.selectedCoin,
        amount: this.currentAssetAmount
      };
    }

  }
};

</script>

<style lang="scss">
._input_space.composed {
  width: 68vw!important;
}
</style>
