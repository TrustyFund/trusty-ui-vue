<template lang="pug">
#trusty_transfer
  ._turnover_inputs
    TrustyInput(label="send any sum")
      template(slot="input")
        input(v-model.number="amount")

      template(slot="right")
        icon-component(name="trusty_arrow_down")
        span.fake_option_width
        select(v-model="selectedCoin.symbol" v-if="isNonZeroLength")
          option(v-for="coin in nonZeroBalanceAssetsIds") {{ coin.symbol }}

    TrustyInput(:isOpen="true", label="payment method" className="select_input")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="paymentMethod" )
          option(v-for="method in transferMethods", :value="method") {{ method }}

  ._turnover_service
    component(:is="gateway" :payload="payload")
</template>

<script>
import { mapGetters } from 'vuex';
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
      selectedCoin: { symbol: 'BTS', id: '1.3.0' },
      paymentMethod: 'transfer',
      amount: '',
    };
  },
  components: { TrustyInput, iconComponent, openledger, Transfer },
  computed: {
    ...mapGetters({
      balances: 'account/getCurrentUserBalances',
      getAssetById: 'assets/getAssetById'
    }),
    isNonZeroLength() {
      return this.nonZeroBalanceAssetsIds.length;
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
        if (methodAssets.some(asset => asset.id === this.selectedCoin.id)) {
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
      return this.amount * (10 ** this.getAssetById(this.selectedCoin.id).precision);
    },
    payload() {
      return {
        selectedCoin: this.selectedCoin,
        amount: this.currentAssetAmount
      };
    }

  }
};

</script>
