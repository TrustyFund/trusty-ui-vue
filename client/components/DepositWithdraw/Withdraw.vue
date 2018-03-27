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
    TrustyInput(:isOpen="true", label="payment method" className="select_input payment-method")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="paymentMethod" )
          option(v-for="method in transferMethods", :value="method") {{ method }}

  ._turnover_service
    component(:is="gateway" :payload="payload")
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import TrustyInput from '@/components/UI/form/input';
import iconComponent from '@/components/UI/icon';
import openledger from './Openledger/Withdraw';
import Transfer from './Transfer/WithdrawTransfer';
import './style.scss';


const methodsByGate = {
  openledger: ['openledger', 'transfer']
};
// BTS amount 0.07
export default {
  data() {
    return {
      selectedCoin: '1.3.0',
      paymentMethod: 'transfer',
      amount: '',
    };
  },
  components: { TrustyInput, iconComponent, openledger, Transfer },
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
      }
    }
  },
  computed: {
    ...mapGetters({
      balances: 'account/getCurrentUserBalances',
      getAssetById: 'assets/getAssetById'
    }),
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
    transferMethods() {
      const availableMethods = [];
      Object.keys(this.transferConfig).forEach((method) => {
        const methodAssets = this.transferConfig[method];
        if (methodAssets.some(asset => asset.id === this.selectedCoin)) {
          availableMethods.push(method);
        }
      });
      return availableMethods;
    },
    gateway() {
      return this.paymentMethod;
    },
    methods() {
      return methodsByGate[this.gateway];
    },
    currentAssetAmount() {
      if (this.$v.$invalid) return 0;
      return this.amount * (10 ** this.getAssetById(this.selectedCoin).precision);
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
