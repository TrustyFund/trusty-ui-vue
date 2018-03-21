<template lang="pug">
#trusty_transfer
  ._turnover_inputs
    TrustyInput(label="send any sum")
      template(slot="input")
        input(v-model.number="amount")
      template(slot="right")
        icon-component(name="trusty_arrow_down")
        span.fake_option_width
        select(v-model="selectedCoin")
          option(v-for="coin in coins") {{ coin }}

    TrustyInput(:isOpen="true", label="payment method" className="select_input")
      template(slot="input")
        input(:style="{display:'none'}")
        select(v-model="paymentMethod" )
          option(v-for="method in transferMethods", :value="method") {{ method }}

    TrustyInput(label="enter receiving address")
      template(slot="input")
        input

  ._turnover_service
    component(:is="gateway" :payload="selectedCoin")
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

export default {
  data() {
    return {
      selectedCoin: 'BTC',
      coins: ['BTC', 'ETH', 'LTC', 'NEO'],
      paymentMethod: 'openledger',
      amount: '',
    };
  },
  components: { TrustyInput, iconComponent, openledger, Transfer },
  computed: {
    ...mapGetters({
      balances: 'account/getCurrentUserBalances',
      getAssetById: 'assets/getAssetById'
    }),
    nonZeroBalanceAssetsIds() {
      return Object.keys(this.balances)
        .filter(id => this.balances[id].balance)
        .map(id => this.getAssetById(id).symbol);
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
        console.log(method);
        console.log(methodAssets.indexOf(this.selectedCoin));
        if (methodAssets.indexOf(this.selectedCoin) > -1) {
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
    }

  }
};

</script>
