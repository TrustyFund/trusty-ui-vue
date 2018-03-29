<template lang="pug">
  .trusty_total_funds
    p {{ name }} FUNDS
    h3._text_center: span {{ totalFunds.toFixed(2) }}$

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    balances: {
      type: Object,
      required: true
    },
    baseId: {
      type: String,
      required: true
    },
    fiatId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      assets: 'assets/getAssets',
      prices: 'market/getMarketHistory'
    }),
    baseAsset() {
      return this.assets[this.baseId];
    },
    fiatAsset() {
      return this.assets[this.fiatId];
    },
    totalFunds() {
      if (!this.prices[this.fiatId]) return 0;

      const totalBaseValue = Object.keys(this.balances).reduce((result, id) => {
        if (!this.prices[id]) return result;
        if (id === this.baseId) return result + this.balances[id].balance;
        return result + (this.balances[id].balance * this.prices[id].last);
      }, 0);

      const fiatMultiplier = 1 / this.prices[this.fiatId].last;
      const totalFiatValue = totalBaseValue * fiatMultiplier;
      const fiatPrecision = this.fiatAsset.precision;

      return (totalFiatValue / (10 ** fiatPrecision)) || 0;
    }
  },
  methods: {
    goToManagePortfolio() {
      this.$router.push({ name: 'manage' });
    }
  },
};
</script>

<style lang="scss">

@import "~@/style/mixins";

.trusty_total_funds {
  margin-top: 1.3vw;
  margin-bottom: 1.2vw;
  p {
    font-family: 'Gotham_Pro_Regular';
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 0; 
  }
  h3 {
    font-family: 'Gotham_Pro_Medium';
    margin-top: 0;
    margin-bottom: 0;
    line-height: initial;
  }
}

</style>
